import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { PokemonSpriteTypePath } from 'src/app/enums/PokemonSpriteTypePath';
import { Pokemon } from 'src/app/interfaces/Pokemon.interface';
import { PokemonPaginatedList } from 'src/app/interfaces/PokemonPaginatedList.interface';
import { FiltersService } from 'src/app/services/filters.service';
import { LanguageService } from 'src/app/services/language.service';
import { PokeApiService } from 'src/app/services/pokeapi.service';
import { FiltersComponent } from '../../components/filters/filters.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { PokemonSpeciesNamePipe } from 'src/app/pipes/pokemon-species-name.pipe';
import { PokemonImageByUrlPipe } from 'src/app/pipes/pokemon-image-by-url.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FiltersComponent,
    MatProgressSpinnerModule,
    InfiniteScrollModule,
    MatCardModule,
    PokemonSpeciesNamePipe,
    PokemonImageByUrlPipe,
    MatProgressBarModule,
    InfiniteScrollModule,
  ],
})
export class OverviewComponent implements OnInit {
  public isLoading = true;
  public data: Array<Pokemon> = [];
  public pokemonCount = 0;
  public pageSize = 50;
  public page = 1;
  public readonly pokemonSpriteTypePath = PokemonSpriteTypePath;

  private _loadPokemonSubscription: Subscription;

  constructor(
    public languageService: LanguageService,
    private _pokeApiService: PokeApiService,
    private _translate: TranslateService,
    private _filtersService: FiltersService
  ) {}

  public ngOnInit(): void {
    this._translate.onLangChange.subscribe(() => {
      this.getData();
    });

    this.getData();
  }

  public changePage(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getData();
  }

  public onScroll(): void {
    ++this.page;
    this.isLoading = true;
    this._pokeApiService
      .getPokemons(this._filtersService.getHttpParams(this.page, this.pageSize))
      .subscribe((result: PokemonPaginatedList) => {
        this.isLoading = false;
        this.data.push(...result.data);
      });
  }

  public getData(): void {
    this.isLoading = true;
    this._loadPokemonSubscription?.unsubscribe();
    this._loadPokemonSubscription = this._pokeApiService
      .getPokemons(this._filtersService.getHttpParams(this.page, this.pageSize))
      .subscribe((result: PokemonPaginatedList) => {
        this.isLoading = false;
        this.data = result.data;
        this.pokemonCount = result.total;
      });
  }
}
