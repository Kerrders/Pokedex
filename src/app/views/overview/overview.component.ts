import { Component, OnInit } from '@angular/core';
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

  constructor(private _pokeApiService: PokeApiService) {}

  public ngOnInit(): void {
    this._pokeApiService
      .getAllPokemons()
      .subscribe((result: PokemonPaginatedList) => {
        this.isLoading = false;
        this.data = result.results;
        this.filteredData = this.data;
      });
  }

  public onNameChange(): void {
    this.filteredData = this.data.filter((pokemon: PokemonList) => {
      return pokemon.name
        .toLocaleLowerCase()
        .includes(this.name.toLocaleLowerCase());
    });
  }
}
