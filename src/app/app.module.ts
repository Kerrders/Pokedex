import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { DetailsComponent } from './views/details/details.component';
import { OverviewComponent } from './views/overview/overview.component';
import { HttpClientModule } from '@angular/common/http';
import { PokemonImageByUrlPipe } from './pipes/pokemon-image-by-url.pipe';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ColorForStatusValuePipe } from './pipes/color-for-status-value.pipe';
import { StatusTableComponent } from './components/status-table/status-table.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    OverviewComponent,
    PokemonImageByUrlPipe,
    ColorForStatusValuePipe,
    StatusTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ScrollingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
