import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { DetailsComponent } from './components/details/details.component';
import { OverviewComponent } from './components/overview/overview.component';
import { HttpClientModule } from '@angular/common/http';
import { PokemonImageByUrlPipe } from './pipes/pokemon-image-by-url.pipe';
import { FormsModule } from '@angular/forms';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    OverviewComponent,
    PokemonImageByUrlPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    CdkVirtualScrollViewport,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
