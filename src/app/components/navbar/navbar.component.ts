import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageHelper } from 'src/app/helpers/languageHelper';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
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
