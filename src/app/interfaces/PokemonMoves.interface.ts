import { MoreToLoad } from './MoreToLoad.interface';
import { VersionGroupDetails } from './VersionGroupDetails.interface';

export interface PokemonMoves {
  move: MoreToLoad;
  version_group_details: Array<VersionGroupDetails>;
}
