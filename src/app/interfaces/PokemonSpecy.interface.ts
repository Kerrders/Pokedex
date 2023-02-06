import { PokemonEvolution } from './PokemonEvolution.interface';
import { PokemonSpeciesName } from './PokemonSpeciesName.interface';

export interface PokemonSpecy {
  id: number;
  identifier: string;
  generation_id: number;
  evolves_from_species_id: string;
  evolution_chain_id: number;
  color_id: number;
  shape_id: number;
  habitat_id: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: number;
  hatch_counter: number;
  has_gender_differences: number;
  growth_rate_id: number;
  forms_switchable: number;
  is_legendary: number;
  is_mythical: number;
  order: number;
  conquest_order: string;
  names?: Array<PokemonSpeciesName>;
  evolution?: PokemonEvolution;
  step?: number;
}
