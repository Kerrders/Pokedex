export interface PokemonSprite {
  other: { [key: string]: any };
  back_default: string;
  front_default: string;

  [key: string]: unknown;
}
