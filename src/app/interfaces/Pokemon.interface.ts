import { PokemonMove } from './PokemonMove.interface';
import { PokemonSpeciesName } from './PokemonSpeciesName.interface';
import { PokemonSpecy } from './PokemonSpecy.interface';
import { PokemonStat } from './PokemonStat.interface';
import { PokemonType } from './PokemonType.interface';
import { TypeEffectiveness } from './TypeEffectiveness';

export interface Pokemon {
  id: number;
  identifier: string;
  species_id: number;
  height: number;
  weight: number;
  base_experience: number;
  order: number;
  is_default: number;
  species: PokemonSpecy;
  species_names: Array<PokemonSpeciesName>;
  moves?: Array<PokemonMove>;
  stats?: Array<PokemonStat>;
  evolution?: Array<PokemonSpecy>;
  types?: Array<PokemonType>;
  typeEffectiveness?: TypeEffectiveness;
}
