import { Pokemon } from './Pokemon.interface';

export interface PokemonPaginatedList {
  total: number;
  next_page_url: string;
  prev_page_url?: string;
  data: Array<Pokemon>;
}
