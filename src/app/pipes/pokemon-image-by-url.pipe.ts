import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonImageByUrl',
})
export class PokemonImageByUrlPipe implements PipeTransform {
  transform(id: string): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }
}
