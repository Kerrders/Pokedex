import pokemonSpecies from '../../assets/data/pokemon_species.json';
import pokemonSpeciesNames from '../../assets/data/pokemon_species_names.json';

export class LanguageHelper {
  private static _allowedLanguages: Array<string> = ['de', 'en'];
  private static _fallbackLanguage = 'en';
  private static _languageIds: { [key: string]: number } = {
    de: 6,
    en: 9,
  };

  public static getLanguageId(): number {
    return LanguageHelper._languageIds[LanguageHelper.getLanguage()];
  }

  public static getLanguage(): string {
    return LanguageHelper._allowedLanguages.includes(navigator.language)
      ? navigator.language
      : LanguageHelper._fallbackLanguage;
  }

  public static getPokemonName(originalName: string): string {
    const species = pokemonSpecies.find(
      (species) => species.identifier === originalName
    );
    if (!species) {
      return originalName;
    }
    return (
      pokemonSpeciesNames.find(
        (speciesNames) =>
          speciesNames.pokemon_species_id === species.id &&
          speciesNames.local_language_id &&
          parseInt(speciesNames.local_language_id) ===
            LanguageHelper.getLanguageId()
      )?.name ?? originalName
    );
  }
}
