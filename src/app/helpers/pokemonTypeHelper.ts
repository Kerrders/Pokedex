import { PokemonTypeEnum } from '../enums/PokemonTypesEnum';
import { PokemonTypeEffectivness } from '../interfaces/PokemonTypeEffectivnes.interface';

export class PokemonTypeHelper {
  public static readonly identifierMap = [
    { id: PokemonTypeEnum.NORMAL, identifier: 'normal' },
    { id: PokemonTypeEnum.FIGHTING, identifier: 'fighting' },
    { id: PokemonTypeEnum.FLYING, identifier: 'flying' },
    { id: PokemonTypeEnum.POISON, identifier: 'poison' },
    { id: PokemonTypeEnum.GROUND, identifier: 'ground' },
    { id: PokemonTypeEnum.ROCK, identifier: 'rock' },
    { id: PokemonTypeEnum.BUG, identifier: 'bug' },
    { id: PokemonTypeEnum.GHOST, identifier: 'ghost' },
    { id: PokemonTypeEnum.STEEL, identifier: 'steel' },
    { id: PokemonTypeEnum.FIRE, identifier: 'fire' },
    { id: PokemonTypeEnum.WATER, identifier: 'water' },
    { id: PokemonTypeEnum.GRASS, identifier: 'grass' },
    { id: PokemonTypeEnum.ELECTRIC, identifier: 'electric' },
    { id: PokemonTypeEnum.PSYCHIC, identifier: 'psychic' },
    { id: PokemonTypeEnum.ICE, identifier: 'ice' },
    { id: PokemonTypeEnum.DRAGON, identifier: 'dragon' },
    { id: PokemonTypeEnum.DARK, identifier: 'dark' },
    { id: PokemonTypeEnum.FAIRY, identifier: 'fairy' },
  ];

  public static weaknessTypeChart: { [key: number]: PokemonTypeEnum[] } = {
    [PokemonTypeEnum.NORMAL]: [PokemonTypeEnum.ROCK, PokemonTypeEnum.STEEL],
    [PokemonTypeEnum.FIRE]: [
      PokemonTypeEnum.FIRE,
      PokemonTypeEnum.WATER,
      PokemonTypeEnum.ROCK,
      PokemonTypeEnum.DRAGON,
    ],
    [PokemonTypeEnum.WATER]: [
      PokemonTypeEnum.WATER,
      PokemonTypeEnum.GRASS,
      PokemonTypeEnum.DRAGON,
    ],
    [PokemonTypeEnum.ELECTRIC]: [
      PokemonTypeEnum.ELECTRIC,
      PokemonTypeEnum.GRASS,
      PokemonTypeEnum.DRAGON,
    ],
    [PokemonTypeEnum.GRASS]: [
      PokemonTypeEnum.FIRE,
      PokemonTypeEnum.GRASS,
      PokemonTypeEnum.POISON,
      PokemonTypeEnum.FLYING,
      PokemonTypeEnum.BUG,
      PokemonTypeEnum.DRAGON,
      PokemonTypeEnum.STEEL,
    ],
    [PokemonTypeEnum.ICE]: [
      PokemonTypeEnum.FIRE,
      PokemonTypeEnum.WATER,
      PokemonTypeEnum.ICE,
      PokemonTypeEnum.STEEL,
    ],
    [PokemonTypeEnum.FIGHTING]: [
      PokemonTypeEnum.POISON,
      PokemonTypeEnum.FLYING,
      PokemonTypeEnum.PSYCHIC,
      PokemonTypeEnum.BUG,
      PokemonTypeEnum.FAIRY,
    ],
    [PokemonTypeEnum.POISON]: [
      PokemonTypeEnum.POISON,
      PokemonTypeEnum.GROUND,
      PokemonTypeEnum.ROCK,
      PokemonTypeEnum.GHOST,
    ],
    [PokemonTypeEnum.GROUND]: [PokemonTypeEnum.GRASS, PokemonTypeEnum.BUG],
    [PokemonTypeEnum.FLYING]: [
      PokemonTypeEnum.ELECTRIC,
      PokemonTypeEnum.ROCK,
      PokemonTypeEnum.STEEL,
    ],
    [PokemonTypeEnum.PSYCHIC]: [PokemonTypeEnum.PSYCHIC, PokemonTypeEnum.STEEL],
    [PokemonTypeEnum.BUG]: [
      PokemonTypeEnum.FIRE,
      PokemonTypeEnum.FIGHTING,
      PokemonTypeEnum.POISON,
      PokemonTypeEnum.FLYING,
      PokemonTypeEnum.GHOST,
      PokemonTypeEnum.STEEL,
      PokemonTypeEnum.FAIRY,
    ],
    [PokemonTypeEnum.ROCK]: [
      PokemonTypeEnum.WATER,
      PokemonTypeEnum.GRASS,
      PokemonTypeEnum.FIGHTING,
      PokemonTypeEnum.GROUND,
      PokemonTypeEnum.STEEL,
    ],
    [PokemonTypeEnum.GHOST]: [PokemonTypeEnum.NORMAL, PokemonTypeEnum.PSYCHIC],
    [PokemonTypeEnum.DRAGON]: [PokemonTypeEnum.STEEL],
    [PokemonTypeEnum.DARK]: [
      PokemonTypeEnum.FIGHTING,
      PokemonTypeEnum.DARK,
      PokemonTypeEnum.FAIRY,
    ],
    [PokemonTypeEnum.STEEL]: [
      PokemonTypeEnum.FIRE,
      PokemonTypeEnum.WATER,
      PokemonTypeEnum.ELECTRIC,
      PokemonTypeEnum.STEEL,
    ],
    [PokemonTypeEnum.FAIRY]: [
      PokemonTypeEnum.FIRE,
      PokemonTypeEnum.POISON,
      PokemonTypeEnum.STEEL,
    ],
  };

  public static calculateDamage(
    attackerType: PokemonTypeEnum,
    defenderType: PokemonTypeEnum,
    defenderType2?: PokemonTypeEnum
  ): number {
    let damageMultiplier = 1;

    const getDamageMultiplier = (defenderType: PokemonTypeEnum) => {
      switch (true) {
        case PokemonTypeHelper.weaknessTypeChart[defenderType].includes(
          attackerType
        ):
          return 2;
        case PokemonTypeHelper.weaknessTypeChart[attackerType].includes(
          defenderType
        ):
          return 0.5;
        default:
          return 1;
      }
    };

    damageMultiplier = getDamageMultiplier(defenderType);
    if (defenderType2) {
      damageMultiplier *= getDamageMultiplier(defenderType2);
    }

    return damageMultiplier;
  }

  public static calculateEffectivenessForType(
    defenderType: PokemonTypeEnum,
    defenderType2?: PokemonTypeEnum
  ): PokemonTypeEffectivness {
    let result: PokemonTypeEffectivness = {
      neutral: [],
      strong: [],
      weak: [],
    };

    for (const type of PokemonTypeHelper.identifierMap) {
      const damageMultiplier = PokemonTypeHelper.calculateDamage(
        type.id,
        defenderType,
        defenderType2
      );

      switch (true) {
        case damageMultiplier > 1:
          result.weak.push(type.id);
          break;
        case damageMultiplier === 1:
          result.neutral.push(type.id);
          break;
        case damageMultiplier < 1:
          result.strong.push(type.id);
          break;
      }
    }
    return result;
  }
}
