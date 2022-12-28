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

  constructor(
    public sidenavService: SidenavService,
    private _translate: TranslateService
  ) {
    const lang: string = LanguageHelper.getLanguage();
    this._translate.setDefaultLang(lang);
    this._translate.use(lang);
  }
}
