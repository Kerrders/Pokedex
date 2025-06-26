import {
  computed,
  DestroyRef,
  inject,
  Injectable,
  signal,
  Signal,
} from '@angular/core';
import { LanguageEnum } from '../enums/LanguageEnum';
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public lang = signal(this.getLanguage());
  public langId: Signal<LanguageEnum> = computed(
    () => this._languageIds[this.lang()] ?? LanguageEnum.ENGLISH
  );
  public fallbackLanguage = 'en';

  private readonly _allowedLanguages: Array<string> = ['de', 'en'];
  private readonly _languageIds: { [key: string]: number } = {
    de: LanguageEnum.GERMAN,
    en: LanguageEnum.ENGLISH,
  };
  private _destroyRef = inject(DestroyRef);

  constructor(private _translate: TranslateService) {
    this.lang.set(this.getLanguage());

    this._translate.onLangChange
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => {
        this.lang.set(this.getLanguage());
      });
  }

  public getAvailableLanguages(): { [key: string]: number } {
    return this._languageIds;
  }

  public saveLanguage(lang: string): void {
    localStorage.setItem('lang', lang);
  }

  public getLanguage(): string {
    const lang = localStorage.getItem('lang') ?? navigator.language;
    return this._allowedLanguages?.includes(lang)
      ? lang
      : this.fallbackLanguage;
  }
}
