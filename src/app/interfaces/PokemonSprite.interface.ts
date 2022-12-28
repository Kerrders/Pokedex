export interface PokemonSprite {
  other: { [key: string]: any };
  back_default: string;
  front_default: string;
  front_shiny: string;
  back_shiny: string;

  [key: string]: unknown;
}
