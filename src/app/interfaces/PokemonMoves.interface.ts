import { MoreToLoad } from './MoreToLoad.interface';
import { PokemonMoveName } from './PokemonMoveName.interface';
import { VersionGroupDetails } from './VersionGroupDetails.interface';

export interface PokemonMoves {
  level: number;
  move_id: number;
  pokemon_move_method_id: number;
  version_group_id: number;
  names: Array<PokemonMoveName>;

  move: MoreToLoad;
  version_group_details: Array<VersionGroupDetails>;
}
