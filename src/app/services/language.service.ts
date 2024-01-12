import { Injectable } from '@angular/core';
import { LanguageEnum } from '../enums/LanguageEnum';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public langId = LanguageEnum.ENGLISH;
  public fallbackLanguage = 'en';

  private _allowedLanguages: Array<string> = ['de', 'en'];
  private _languageIds: { [key: string]: number } = {
    de: LanguageEnum.GERMAN,
    en: LanguageEnum.ENGLISH,
  };

  constructor(private _translate: TranslateService) {
    this.langId = this.getLanguageId();

    this._translate.onLangChange.subscribe(() => {
      this.langId = this.getLanguageId();
    });
  }

  public getAvailableLanguages(): { [key: string]: number } {
    return this._languageIds;
  }

  public getLanguageId(): number {
    return this._languageIds[this.getLanguage()] ?? LanguageEnum.ENGLISH;
  }

  public setLanguage(lang: string): void {
    localStorage.setItem('lang', lang);
  }

  public getLanguage(): string {
    const lang = localStorage.getItem('lang') ?? navigator.language;
    return this._allowedLanguages?.includes(lang)
      ? lang
      : this.fallbackLanguage;
  }
}
