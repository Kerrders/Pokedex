import { Component, input } from '@angular/core';
import { PokemonSpriteTypePath } from 'src/app/enums/PokemonSpriteTypePath';
import { PokemonSpecy } from 'src/app/interfaces/PokemonSpecy.interface';
import { PokemonSpeciesNamePipe } from '../../pipes/pokemon-species-name.pipe';
import { PokemonImageByUrlPipe } from '../../pipes/pokemon-image-by-url.pipe';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-evolution-tab',
  templateUrl: './evolution-tab.component.html',
  styleUrls: ['./evolution-tab.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    PokemonSpeciesNamePipe,
    PokemonImageByUrlPipe,
  ],
})
export class EvolutionTabComponent {
  public readonly pokemonSpriteTypePath = PokemonSpriteTypePath;

  public evolutionChain = input<Array<PokemonSpecy>>([]);
  public maximalEvolutionStep = input<number>(0);
  public actualLanguageId = input<number>(0);
}
