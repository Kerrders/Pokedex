export interface PokemonEvolution {
  id: number;
  evolved_species_id: number;
  evolution_trigger_id: number;
  trigger_item_id: string | null;
  minimum_level: number | null;
  gender_id: string | null;
  location_id: string | null;
  held_item_id: string | null;
  time_of_day: string | null;
  known_move_id: string | null;
  known_move_type_id: string | null;
  minimum_happiness: string | null;
  minimum_beauty: string | null;
  minimum_affection: string | null;
  relative_physical_stats: string | null;
  party_species_id: string | null;
  party_type_id: string | null;
  trade_species_id: string | null;
  needs_overworld_rain: number | null;
  turn_upside_down: number | null;
  needs_multiplayer: number | null;
  near_special_rock: number | null;
  region_id: number | null;
  required_pokemon_form_id: number | null;
  evolved_pokemon_form_id: number | null;
  used_move_id: number | null;
  minimum_move_count: number | null;
  minimum_steps: number | null;
  minimum_damage_taken: number | null;
  nature_bitmask: number | null;
  condition_expression: string | null;
  percentage_chance: number | null;
  evolution_trigger_prose?: Array<EvolutionTriggerProse>;
  evolves_from_species_id: number;
  step?: number;
}

export interface EvolutionTriggerProse {
  evolution_trigger_id: number;
  local_language_id: number;
  name: string;
}
