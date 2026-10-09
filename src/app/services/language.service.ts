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
    () => this.languageIds[this.lang()] ?? LanguageEnum.ENGLISH
  );
  public fallbackLanguage = 'en';

  private readonly allowedLanguages: Array<string> = ['de', 'en'];
  private readonly languageIds: { [key: string]: number } = {
    de: LanguageEnum.GERMAN,
    en: LanguageEnum.ENGLISH,
  };

  private readonly destroyRef = inject(DestroyRef);
  private readonly translate = inject(TranslateService);

  constructor() {
    this.lang.set(this.getLanguage());

    this.translate.onLangChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.lang.set(this.getLanguage());
      });
  }

  public getAvailableLanguages(): { [key: string]: number } {
    return this.languageIds;
  }

  public saveLanguage(lang: string): void {
    localStorage.setItem('lang', lang);
  }

  public getLanguage(): string {
    const lang = localStorage.getItem('lang') ?? navigator.language;
    return this.allowedLanguages?.includes(lang) ? lang : this.fallbackLanguage;
  }
}
