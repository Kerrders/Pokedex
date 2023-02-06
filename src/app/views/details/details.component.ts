import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PokemonSpriteTypePath } from 'src/app/enums/PokemonSpriteTypePath';
import { LanguageHelper } from 'src/app/helpers/languageHelper';
import { Pokemon } from 'src/app/interfaces/Pokemon.interface';
import { PokemonEvolution } from 'src/app/interfaces/PokemonEvolution.interface';
import { PokemonSpecy } from 'src/app/interfaces/PokemonSpecy.interface';
import { PokeApiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public isLoading: boolean;
  public pokemonData: Pokemon;
  public actualLanguageId = LanguageHelper.getLanguageId();
  public evolutionChain: Array<PokemonSpecy> = [];
  public maximalEvolutionStep: number;
  public readonly pokemonSpriteTypePath = PokemonSpriteTypePath;
  private _name: string;

  constructor(
    private _pokeApiService: PokeApiService,
    private _route: ActivatedRoute,
    private _translate: TranslateService
  ) {}

  public ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this._name = params['name'];
      this.loadData();
    });
    this._translate.onLangChange.subscribe(() => {
      this.actualLanguageId = LanguageHelper.getLanguageId();
    });
  }

  private loadData(): void {
    this.isLoading = true;
    this._pokeApiService.getPokemon(this._name).subscribe((result: Pokemon) => {
      if (result.evolution && result.evolution.length) {
        this.parseEvolutionChain(result.evolution);
      }
      this.pokemonData = result;
      this.isLoading = false;
    });
  }

  private parseEvolutionChain(chain: Array<PokemonSpecy>): void {
    const pokemonMap: { [key: number]: number } = {};

    for (const pokemon of chain) {
      if (pokemon.evolves_from_species_id === null) {
        pokemonMap[pokemon.id] = 0;
      } else {
        const evolvesFromId = parseInt(pokemon.evolves_from_species_id);
        const evolvesFromStep = pokemonMap[evolvesFromId];
        pokemonMap[pokemon.id] = evolvesFromStep + 1;
      }
    }

    for (const pokemon of chain) {
      pokemon.step = pokemonMap[pokemon.id];
    }

    this.evolutionChain = chain;

    this.maximalEvolutionStep = chain.reduce(
      (max: number, pokemon: PokemonSpecy) => Math.max(max, pokemon?.step ?? 0),
      0
    );
  }
}
