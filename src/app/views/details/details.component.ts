import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PokemonSpriteTypePath } from 'src/app/enums/PokemonSpriteTypePath';
import { LanguageHelper } from 'src/app/helpers/languageHelper';
import { Pokemon } from 'src/app/interfaces/Pokemon.interface';
import { PokemonSpecy } from 'src/app/interfaces/PokemonSpecy.interface';

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

  constructor(
    private _translate: TranslateService,
    private _activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this._activatedRoute.data.subscribe(({ pokemonData }) => {
      this.pokemonData = pokemonData;
      this.evolutionChain = [];
      if (this.pokemonData.evolution) {
        this.parseEvolutionChain(this.pokemonData.evolution);
      }
    });
    this._translate.onLangChange.subscribe(() => {
      this.actualLanguageId = LanguageHelper.getLanguageId();
    });
  }

  private parseEvolutionChain(chain: Array<PokemonSpecy>): void {
    const pokemonMap: { [key: number]: number } = {};

    for (const pokemon of chain) {
      if (pokemon.evolves_from_species_id === null) {
        pokemonMap[pokemon.id] = 0;
      } else {
        const evolvesFromId = parseInt(pokemon.evolves_from_species_id);
        const evolvesFromStep = pokemonMap[evolvesFromId] || 0;
        pokemonMap[pokemon.id] = evolvesFromStep + 1;
      }
    }

    for (const pokemon of chain) {
      pokemon.step = pokemonMap[pokemon.id];
    }

    this.evolutionChain = chain.sort((a, b) => {
      if (a.step === 0) return -1;
      if (b.step === 0) return 1;
      return (a.step ?? 0) - (b.step ?? 0);
    });

    this.maximalEvolutionStep = chain.reduce(
      (max: number, pokemon: PokemonSpecy) => Math.max(max, pokemon?.step ?? 0),
      0
    );
  }
}
