import { Component, input } from '@angular/core';
import { PokemonSpriteTypePath } from 'src/app/enums/PokemonSpriteTypePath';
import { PokemonSpecy } from 'src/app/interfaces/PokemonSpecy.interface';
import { PokemonSpeciesNamePipe } from '../../pipes/pokemon-species-name.pipe';
import { PokemonImageByUrlPipe } from '../../pipes/pokemon-image-by-url.pipe';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { PokemonEvolution } from '../../interfaces/PokemonEvolution.interface';

@Component({
  selector: 'app-evolution-tab',
  templateUrl: './evolution-tab.component.html',
  styleUrls: ['./evolution-tab.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    TranslateModule,
    PokemonSpeciesNamePipe,
    PokemonImageByUrlPipe,
  ],
})
export class EvolutionTabComponent {
  public readonly pokemonSpriteTypePath = PokemonSpriteTypePath;

  public evolutionChain = input<Array<PokemonSpecy>>([]);
  public maximalEvolutionStep = input<number>(0);
  public actualLanguageId = input<number>(0);

  public getEvolutionTriggerName(
    evolution: PokemonEvolution
  ): string | undefined {
    const prose = evolution.evolution_trigger_prose ?? [];
    return (
      prose.find(
        (translation) =>
          translation.local_language_id === this.actualLanguageId()
      )?.name ??
      prose.find((translation) => translation.local_language_id === 9)?.name ??
      prose[0]?.name
    );
  }

  public getEvolutionConditions(
    evolution: PokemonEvolution
  ): Array<{ key: string; value?: string }> {
    const conditions: Array<{ key: string; value?: string }> = [];
    const metadata = new Set([
      'id',
      'evolved_species_id',
      'evolution_trigger_id',
      'evolution_trigger_prose',
      'version_group_id',
      'is_default',
      'evolves_from_species_id',
      'step',
    ]);
    const booleanConditions = new Set([
      'needs_overworld_rain',
      'turn_upside_down',
      'needs_multiplayer',
      'near_special_rock',
    ]);

    for (const key of Object.keys(evolution) as Array<keyof PokemonEvolution>) {
      const value = evolution[key];
      if (metadata.has(key)) {
        continue;
      }
      if (booleanConditions.has(key)) {
        if (value) {
          conditions.push({ key });
        }
      } else if (value !== null && value !== undefined && value !== '') {
        conditions.push({ key, value: String(value) });
      }
    }

    return conditions;
  }
}
