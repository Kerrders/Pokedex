import { Component } from '@angular/core';
import { SidenavService } from './services/sidenav.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageHelper } from './helpers/languageHelper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'pokedex';
  public actualLanguage = LanguageHelper.getLanguage();
  public languages = LanguageHelper.getAvailableLanguages();
  public actualLanguageId = LanguageHelper.getLanguageId();

  constructor(
    public sidenavService: SidenavService,
    private _translate: TranslateService
  ) {
    this._translate.setDefaultLang(LanguageHelper.fallbackLanguage);
    this._setLanguage();
  }

  public onChangeLanguage(): void {
    LanguageHelper.setLanguage(this.actualLanguage);
    this.actualLanguageId = LanguageHelper.getLanguageId();
    this._setLanguage();
  }

  private _setLanguage(): void {
    this._translate.use(this.actualLanguage);
  }
}
