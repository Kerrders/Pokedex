import { PokemonSpeciesNames } from './PokemonSpeciesNames.interface';

export interface PokemonList {
  name: string;
  url: string;
  translatedName?: string;
  species_names: Array<PokemonSpeciesNames>;
}
