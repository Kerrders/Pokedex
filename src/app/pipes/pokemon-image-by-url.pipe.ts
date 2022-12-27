import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonImageByUrl',
})
export class PokemonImageByUrlPipe implements PipeTransform {
  transform(url: string): string {
    const regex = /pokemon\/(.*)\//g;
    const id: string | undefined = url
      .match(regex)?.[0]
      .replace('pokemon/', '')
      .replace('/', '');
    return id
      ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
      : '';
  }
}
