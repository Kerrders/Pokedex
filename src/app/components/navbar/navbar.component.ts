import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonSpeciesNamePipe } from 'src/app/pipes/pokemon-species-name.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatButtonToggleModule,
    TranslateModule,
    PokemonSpeciesNamePipe,
    FlexLayoutModule,
  ],
  standalone: true,
})
export class NavbarComponent {
  public actualLanguage = this.languageService.getLanguage();

  constructor(
    public sidenavService: SidenavService,
    public languageService: LanguageService,
    private _translate: TranslateService
  ) {
    this._translate.setDefaultLang(this.languageService.fallbackLanguage);
    this._setLanguage();
  }

  public onChangeLanguage(): void {
    this.languageService.saveLanguage(this.actualLanguage);
    this._setLanguage();
  }

  private _setLanguage(): void {
    this._translate.use(this.actualLanguage);
  }
}
