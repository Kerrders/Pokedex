import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PokemonSpriteTypePath } from 'src/app/enums/PokemonSpriteTypePath';
import { Pokemon } from 'src/app/interfaces/Pokemon.interface';
import { PokemonSpecy } from 'src/app/interfaces/PokemonSpecy.interface';
import { LanguageService } from 'src/app/services/language.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { PokemonImageByUrlPipe } from '../../pipes/pokemon-image-by-url.pipe';
import { EvolutionTabComponent } from '../../components/evolution-tab/evolution-tab.component';
import { StatusTableComponent } from '../../components/status-table/status-table.component';
import { TypeEffectivenessTableComponent } from '../../components/type-effectiveness-table/type-effectiveness-table.component';
import { MoveTableComponent } from '../../components/move-table/move-table.component';
import { TypeToNamePipe } from '../../pipes/type-to-name.pipe';
import { ColorForTypePipe } from '../../pipes/color-for-type.pipe';
import { SortByTypeDamagePipe } from '../../pipes/sort-by-type-damage.pipe';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatCardModule,
    MatTabsModule,
    MatDividerModule,
    MatChipsModule,
    PokemonImageByUrlPipe,
    EvolutionTabComponent,
    StatusTableComponent,
    TypeEffectivenessTableComponent,
    MoveTableComponent,
    TypeToNamePipe,
    ColorForTypePipe,
    SortByTypeDamagePipe,
  ],
})
export class DetailsComponent implements OnInit {
  public isLoading: boolean;
  public pokemonData: Pokemon;
  public actualLanguageId = this.languageService.getLanguageId();
  public evolutionChain: Array<PokemonSpecy> = [];
  public maximalEvolutionStep: number;
  public readonly pokemonSpriteTypePath = PokemonSpriteTypePath;

  constructor(
    public languageService: LanguageService,
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
      this.actualLanguageId = this.languageService.getLanguageId();
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
