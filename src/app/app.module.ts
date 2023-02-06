import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { DetailsComponent } from './views/details/details.component';
import { OverviewComponent } from './views/overview/overview.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PokemonImageByUrlPipe } from './pipes/pokemon-image-by-url.pipe';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ColorForStatusValuePipe } from './pipes/color-for-status-value.pipe';
import { StatusTableComponent } from './components/status-table/status-table.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MoveTableComponent } from './components/move-table/move-table.component';
import { MoveNamePipe } from './pipes/move-name.pipe';
import { VersionNamePipe } from './pipes/version-name.pipe';
import { EvolutionTabComponent } from './components/evolution-tab/evolution-tab.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ColorForTypePipe } from './pipes/color-for-type.pipe';
import { PokemonSpeciesNamePipe } from './pipes/pokemon-species-name.pipe';
import { TypeToNamePipe } from './pipes/type-to-name.pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    OverviewComponent,
    StatusTableComponent,
    MoveTableComponent,
    PokemonImageByUrlPipe,
    ColorForStatusValuePipe,
    MoveNamePipe,
    VersionNamePipe,
    EvolutionTabComponent,
    NavbarComponent,
    ColorForTypePipe,
    PokemonSpeciesNamePipe,
    TypeToNamePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ScrollingModule,
    InfiniteScrollModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
