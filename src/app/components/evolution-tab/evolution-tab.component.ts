import { Component, Input } from '@angular/core';
import { PokemonSpriteTypePath } from 'src/app/enums/PokemonSpriteTypePath';
import { MappedEvolutionChain } from 'src/app/interfaces/MappedEvolutionChain.interface';

@Component({
  selector: 'app-evolution-tab',
  templateUrl: './evolution-tab.component.html',
  styleUrls: ['./evolution-tab.component.scss'],
})
export class EvolutionTabComponent {
  public readonly pokemonSpriteTypePath = PokemonSpriteTypePath;

  @Input()
  public evolutionChain: Array<MappedEvolutionChain>;

  @Input()
  public maximalEvolutionStep: number;

  @Input()
  public actualLanguageId: number;
}
