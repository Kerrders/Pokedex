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
  public actualLanguage: string = 'de';
  public languages = LanguageHelper.getAvailableLanguages();

  constructor(
    public sidenavService: SidenavService,
    private _translate: TranslateService
  ) {
    this._translate.setDefaultLang(LanguageHelper.fallbackLanguage);
    this._setLanguage();
    this.actualLanguage = LanguageHelper.getLanguage();
  }

  public onChangeLanguage(): void {
    LanguageHelper.setLanguage(this.actualLanguage);
    this._setLanguage();
  }

  private _setLanguage(): void {
    this._translate.use(this.actualLanguage);
  }
}
