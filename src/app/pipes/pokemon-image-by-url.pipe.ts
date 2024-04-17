import { Pipe, PipeTransform } from '@angular/core';
import { PokemonSpriteTypePath } from '../enums/PokemonSpriteTypePath';

@Pipe({
  name: 'pokemonImage',
  standalone: true,
})
export class PokemonImageByUrlPipe implements PipeTransform {
  transform(id: string | number, type: PokemonSpriteTypePath): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${type}/${id}.png`;
  }
}
