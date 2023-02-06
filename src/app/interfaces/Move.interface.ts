import { MoveName } from './MoveName.interface';

export interface Move {
  id: number;
  identifier: string;
  generation_id: number;
  type_id: number;
  power: number;
  pp: number;
  accuracy: number;
  priority: number;
  target_id: number;
  damage_class_id: number;
  effect_id: number;
  effect_chance: string;
  contest_type_id: number;
  contest_effect_id: number;
  super_contest_effect_id: number;
  names?: Array<MoveName>;
}
