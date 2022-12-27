import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonDetails } from 'src/app/interfaces/PokemonDetails.interface';
import { PokeApiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public isLoading: boolean;
  public pokemonData: PokemonDetails;
  private name: string;

  constructor(
    private _pokeApiService: PokeApiService,
    private _route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.name = params['name'];
      this.loadData();
    });
  }

  private loadData(): void {
    this.isLoading = true;
    this._pokeApiService.getPokemon(this.name).subscribe((result: any) => {
      this.pokemonData = result;
      this.isLoading = false;
    });
  }
}
