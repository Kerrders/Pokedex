import { Injectable } from '@angular/core';
import { LanguageEnum } from '../enums/LanguageEnum';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public fallbackLanguage = 'en';
  private _allowedLanguages: Array<string> = ['de', 'en'];
  private _languageIds: { [key: string]: number } = {
    de: LanguageEnum.GERMAN,
    en: LanguageEnum.ENGLISH,
  };

  public getAvailableLanguages(): { [key: string]: number } {
    return this._languageIds;
  }

  public getLanguageId(): number {
    return this._languageIds[this.getLanguage()];
  }

  public setLanguage(lang: string): void {
    localStorage.setItem('lang', lang);
  }

  public getLanguage(): string {
    const lang = localStorage.getItem('lang') ?? navigator.language;
    return this._allowedLanguages.includes(lang) ? lang : this.fallbackLanguage;
  }
}
