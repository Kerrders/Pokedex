export interface PokemonEvolution {
  id: number;
  evolved_species_id: number;
  evolution_trigger_id: number;
  trigger_item_id: string;
  minimum_level: number;
  gender_id: string;
  location_id: string;
  held_item_id: string;
  time_of_day: string;
  known_move_id: string;
  known_move_type_id: string;
  minimum_happiness: string;
  minimum_beauty: string;
  minimum_affection: string;
  relative_physical_stats: string;
  party_species_id: string;
  party_type_id: string;
  trade_species_id: string;
  needs_overworld_rain: number;
  turn_upside_down: number;
  evolves_from_species_id: number;
  step?: number;
}
