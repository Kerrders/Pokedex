import { EvolutionChain } from './EvolutionChain.interface';

export interface EvolutionChainRequest {
  baby_trigger_item?: string;
  id: number;
  chain: EvolutionChain;
}
