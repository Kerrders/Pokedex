export class LanguageHelper {
  public static fallbackLanguage = 'en';
  private static _allowedLanguages: Array<string> = ['de', 'en'];
  private static _languageIds: { [key: string]: number } = {
    de: 6,
    en: 9,
  };

  public static getAvailableLanguages(): { [key: string]: number } {
    return this._languageIds;
  }

  public static getLanguageId(): number {
    return LanguageHelper._languageIds[LanguageHelper.getLanguage()];
  }

  public static setLanguage(lang: string): void {
    localStorage.setItem('lang', lang);
  }

  public static getLanguage(): string {
    const lang = localStorage.getItem('lang') ?? navigator.language;
    return LanguageHelper._allowedLanguages.includes(lang)
      ? lang
      : LanguageHelper.fallbackLanguage;
  }
}
