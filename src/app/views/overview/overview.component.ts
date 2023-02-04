import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageHelper } from 'src/app/helpers/languageHelper';
import { PokemonList } from 'src/app/interfaces/PokemonList.interface';
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
  public data: Array<PokemonList> = [];
  public filteredData: Array<PokemonList> = [];

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
    this.filteredData = this.data.filter((pokemon: PokemonList) => {
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
        this.data = result.results.map((pokemon) => {
          pokemon.translatedName = LanguageHelper.getPokemonName(
            pokemon.name,
            LanguageHelper.getLanguageId()
          );
          return pokemon;
        });
        this.filteredData = this.data;
      });
  }
}
