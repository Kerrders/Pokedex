import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PokemonSpriteTypePath } from 'src/app/enums/PokemonSpriteTypePath';
import { LanguageHelper } from 'src/app/helpers/languageHelper';
import { MappedEvolutionChain } from 'src/app/interfaces/MappedEvolutionChain.interface';
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
  public actualLanguageId = LanguageHelper.getLanguageId();
  public evolutionChain: Array<MappedEvolutionChain> = [];
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
    this._pokeApiService
      .getPokemon(this._name)
      .subscribe((result: PokemonDetails) => {
        if (result.evolution_chain && result.evolution_chain.length) {
          this.parseEvolutionChain(result.evolution_chain);
        }
        this.pokemonData = result;
        this.isLoading = false;
      });
  }

  private parseEvolutionChain(chain: any): void {
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
      (max: number, pokemon: any) => Math.max(max, pokemon.step),
      0
    );
  }
}
