import { Component, Input } from '@angular/core';
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
  standalone: true,
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

  @Input()
  public evolutionChain: Array<PokemonSpecy>;

  @Input()
  public maximalEvolutionStep: number;

  @Input()
  public actualLanguageId: number;
}
