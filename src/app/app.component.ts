import { Component } from '@angular/core';
import { SidenavService } from './services/sidenav.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'pokedex';
  private _allowedLanguages: Array<string> = ['de', 'en'];
  private _fallbackLanguage = 'en';

  constructor(
    public sidenavService: SidenavService,
    private _translate: TranslateService
  ) {
    if (this._allowedLanguages.includes(navigator.language)) {
      this._translate.setDefaultLang(navigator.language);
      this._translate.use(navigator.language);
    } else {
      this._translate.setDefaultLang(this._fallbackLanguage);
      this._translate.use(this._fallbackLanguage);
    }
  }
}
