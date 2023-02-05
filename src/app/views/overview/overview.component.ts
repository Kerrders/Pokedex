import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
  public filteredData: Array<Pokemon> = [];
  public readonly pokemonSpriteTypePath = PokemonSpriteTypePath;

  constructor(
    private _pokeApiService: PokeApiService,
    private _translate: TranslateService
  ) {}

  public ngOnInit(): void {
    this._translate.onLangChange.subscribe(() => {
      this._getData();
    });
    this._getData();
  }

  public onNameChange(): void {
    this.filteredData = this.data.filter((pokemon: Pokemon) => {
      return pokemon.translatedName
        ?.toLocaleLowerCase()
        ?.includes(this.name.toLocaleLowerCase());
    });
  }

  private _getData(): void {
    this._pokeApiService
      .getAllPokemons()
      .subscribe((result: PokemonPaginatedList) => {
        this.isLoading = false;
        this.data = result.data.map((pokemon) => {
          pokemon.translatedName =
            pokemon?.species_names?.find(
              (name) =>
                name.local_language_id === LanguageHelper.getLanguageId()
            )?.name ?? 'UNKNOWN';
          return pokemon;
        });
        this.filteredData = this.data;
      });
  }
}
