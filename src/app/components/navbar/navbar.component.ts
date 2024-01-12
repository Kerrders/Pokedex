import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public actualLanguage = this.languageService.getLanguage();
  public languages = this.languageService.getAvailableLanguages();
  public actualLanguageId = this.languageService.getLanguageId();

  constructor(
    public sidenavService: SidenavService,
    public languageService: LanguageService,
    private _translate: TranslateService
  ) {
    this._translate.setDefaultLang(this.languageService.fallbackLanguage);
    this._setLanguage();
  }

  public onChangeLanguage(): void {
    this.languageService.setLanguage(this.actualLanguage);
    this.actualLanguageId = this.languageService.getLanguageId();
    this._setLanguage();
  }

  private _setLanguage(): void {
    this._translate.use(this.actualLanguage);
  }
}
