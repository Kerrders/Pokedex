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
import { LanguageHelper } from 'src/app/helpers/languageHelper';
import { Pokemon } from 'src/app/interfaces/Pokemon.interface';
import { PokemonPaginatedList } from 'src/app/interfaces/PokemonPaginatedList.interface';
import { PokeApiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  public isLoading = true;
  public name: string;
  public data: Array<Pokemon> = [];
  public pokemonCount = 0;
  public pageSize = 50;
  public page = 1;
  public langId = LanguageHelper.getLanguageId();
  public nameChanged = new Subject<string>();
  public readonly pokemonSpriteTypePath = PokemonSpriteTypePath;
  private _loadPokemonSubscription: Subscription;

  constructor(
    private _pokeApiService: PokeApiService,
    private _translate: TranslateService
  ) {}

  public ngOnInit(): void {
    this._translate.onLangChange.subscribe(() => {
      this.langId = LanguageHelper.getLanguageId();
      this._getData();
    });
    this.nameChanged
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => {
        this._getData();
      });
    this._getData();
  }

  public onNameChange(): void {
    this.page = 1;
    this._getData();
  }

  public changePage(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex + 1;
    this._getData();
  }

  private getHttpParams(): HttpParams {
    let params = new HttpParams()
      .set('page', this.page)
      .set('perPage', this.pageSize)
      .set('langId', LanguageHelper.getLanguageId());

    if (this.name && this.name.length > 3) {
      params = params.set('name', this.name);
    }

    return params;
  }

  private _getData(): void {
    this.isLoading = true;
    this._loadPokemonSubscription?.unsubscribe();
    this._loadPokemonSubscription = this._pokeApiService
      .getPokemons(this.getHttpParams())
      .subscribe((result: PokemonPaginatedList) => {
        this.isLoading = false;
        this.data = result.data;
        this.pokemonCount = result.total;
      });
  }
}
