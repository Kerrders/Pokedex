import {
  Component,
  computed,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
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
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { PokemonSpeciesNamePipe } from 'src/app/pipes/pokemon-species-name.pipe';
import { PokemonImageByUrlPipe } from 'src/app/pipes/pokemon-image-by-url.pipe';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    imports: [
        CommonModule,
        RouterModule,
        FiltersComponent,
        MatProgressSpinnerModule,
        MatCardModule,
        PokemonSpeciesNamePipe,
        PokemonImageByUrlPipe,
        MatProgressBarModule,
        InfiniteScrollDirective,
        NgOptimizedImage,
    ]
})
export class OverviewComponent implements OnInit {
  public isLoading = signal(true);
  public data: WritableSignal<Array<Pokemon>> = signal([]);
  public pokemonCount = signal(0);
  public pageSize = signal(50);
  public page = signal(1);
  public isFirstPage: Signal<boolean> = computed(() => this.page() === 1);
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
    this.pageSize.set(event.pageSize);
    this.page.set(event.pageIndex + 1);
    this.getData();
  }

  public onScroll(): void {
    this.page.set(this.page() + 1);
    this.isLoading.set(true);
    this._pokeApiService
      .getPokemons(
        this._filtersService.getHttpParams(this.page(), this.pageSize())
      )
      .subscribe((result: PokemonPaginatedList) => {
        this.isLoading.set(false);
        this.data().push(...result.data);
      });
  }

  public getData(): void {
    this.isLoading.set(true);
    this._loadPokemonSubscription?.unsubscribe();
    this._loadPokemonSubscription = this._pokeApiService
      .getPokemons(
        this._filtersService.getHttpParams(this.page(), this.pageSize())
      )
      .subscribe((result: PokemonPaginatedList) => {
        this.isLoading.set(false);
        this.data.set(result.data);
        this.pokemonCount.set(result.total);
      });
  }
}
