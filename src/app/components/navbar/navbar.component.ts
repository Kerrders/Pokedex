import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonSpeciesNamePipe } from 'src/app/pipes/pokemon-species-name.pipe';

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
    MatButtonToggleModule,
    TranslateModule,
    PokemonSpeciesNamePipe,
  ],
})
export class NavbarComponent {
  public readonly sidenavService = inject(SidenavService);
  public readonly languageService = inject(LanguageService);
  private readonly translate = inject(TranslateService);

  public actualLanguage = this.languageService.getLanguage();

  constructor() {
    this.translate.setDefaultLang(this.languageService.fallbackLanguage);
    this.setLanguage();
  }

  public onChangeLanguage(): void {
    this.languageService.saveLanguage(this.actualLanguage);
    this.setLanguage();
  }

  private setLanguage(): void {
    this.translate.use(this.actualLanguage);
  }
}
