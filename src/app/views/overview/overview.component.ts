import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  Subscription,
} from 'rxjs';
import { PokemonSpriteTypePath } from 'src/app/enums/PokemonSpriteTypePath';
import { PokemonTypeEnum } from 'src/app/enums/PokemonTypesEnum';
import { LanguageHelper } from 'src/app/helpers/languageHelper';
import { PokemonTypeHelper } from 'src/app/helpers/pokemonTypeHelper';
import { Pokemon } from 'src/app/interfaces/Pokemon.interface';
import { PokemonPaginatedList } from 'src/app/interfaces/PokemonPaginatedList.interface';
import { InputStateService } from 'src/app/services/input-state.service';
import { PokeApiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  public isLoading = true;
  public isPageLoading = false;
  public name: string;
  public data: Array<Pokemon> = [];
  public pokemonCount = 0;
  public pageSize = 50;
  public page = 1;
  public langId = LanguageHelper.getLanguageId();
  public nameChanged = new Subject<string>();
  public types: Array<PokemonTypeEnum> = [];
  public availableTypes: Array<PokemonTypeEnum> =
    PokemonTypeHelper.availableTypes;
  public readonly pokemonSpriteTypePath = PokemonSpriteTypePath;
  private _loadPokemonSubscription: Subscription;

  constructor(
    private _pokeApiService: PokeApiService,
    private _translate: TranslateService,
    private _inputStateService: InputStateService
  ) {}

  public ngOnInit(): void {
    this._translate.onLangChange.subscribe(() => {
      this.langId = LanguageHelper.getLanguageId();
      this.getData();
    });

    this.nameChanged
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => {
        this.page = 1;
        this.getData();
      });

    this._restoreInputValues();
    this.getData();
  }

  public changePage(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getData();
  }

  public onScroll(): void {
    ++this.page;
    this.isPageLoading = true;
    this._pokeApiService
      .getPokemons(this._getHttpParams())
      .subscribe((result: PokemonPaginatedList) => {
        this.isPageLoading = false;
        this.data.push(...result.data);
      });
  }

  public getData(): void {
    this.isLoading = true;
    this._loadPokemonSubscription?.unsubscribe();
    this._loadPokemonSubscription = this._pokeApiService
      .getPokemons(this._getHttpParams())
      .subscribe((result: PokemonPaginatedList) => {
        this.isLoading = false;
        this.data = result.data;
        this.pokemonCount = result.total;
      });

    this._inputStateService.setInputValue<string>('name', this.name);
    this._inputStateService.setInputValue<Array<PokemonTypeEnum>>(
      'types',
      this.types
    );
  }

  private _getHttpParams(): HttpParams {
    let params = new HttpParams()
      .set('page', this.page)
      .set('perPage', this.pageSize)
      .set('langId', LanguageHelper.getLanguageId());

    if (this.name && this.name.length > 3) {
      params = params.set('name', this.name);
    }

    if (this.types.length) {
      for (const typeIds of this.types) {
        params = params.append('typeIds[]', typeIds);
      }
    }

    return params;
  }

  private _restoreInputValues(): void {
    const name: string | undefined =
      this._inputStateService.getInputValue<string>('name');
    if (name) {
      this.name = name;
    }

    const types: Array<PokemonTypeEnum> | undefined =
      this._inputStateService.getInputValue<Array<PokemonTypeEnum>>('types');
    if (types) {
      this.types = types;
    }
  }
}
