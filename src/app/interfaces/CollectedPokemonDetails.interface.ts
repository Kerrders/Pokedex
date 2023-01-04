import { EvolutionChainRequest } from './EvolutionChainRequest.interface';
import { PokemonDetails } from './PokemonDetails.interface';
import { PokemonSpecies } from './PokemonSpecies.interface';

export interface CollectedPokemonDetails {
  details: PokemonDetails;
  species: PokemonSpecies;
  evolution_chain?: EvolutionChainRequest;
}
