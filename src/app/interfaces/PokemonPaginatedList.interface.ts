import { PokemonList } from "./PokemonList.interface";

export interface PokemonPaginatedList {
  count: number;
  next: string;
  previus?: string;
  results: Array<PokemonList>;
}
