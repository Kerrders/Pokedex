import { PokemonImageByUrlPipe } from './pokemon-image-by-url.pipe';

describe('PokemonImageByNamePipe', () => {
  it('create an instance', () => {
    const pipe = new PokemonImageByUrlPipe();
    expect(pipe).toBeTruthy();
  });
});
