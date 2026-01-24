import {
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  Signal,
  signal,
  viewChild,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { PokemonSpriteTypePath } from 'src/app/enums/PokemonSpriteTypePath';
import { Pokemon } from 'src/app/interfaces/Pokemon.interface';
import { PokemonPaginatedList } from 'src/app/interfaces/PokemonPaginatedList.interface';
import { FiltersService } from 'src/app/services/filters.service';
import { LanguageService } from 'src/app/services/language.service';
import { PokeApiService } from 'src/app/services/pokeapi.service';
import { FiltersComponent } from '../../components/filters/filters.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { PokemonSpeciesNamePipe } from 'src/app/pipes/pokemon-species-name.pipe';
import { PokemonImageByUrlPipe } from 'src/app/pipes/pokemon-image-by-url.pipe';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    NgOptimizedImage,
  ],
})
export class OverviewComponent implements OnInit {
  public isLoading = signal(false);
  public data = signal<Array<Pokemon>>([]);
  public pokemonCount = signal(0);
  public pageSize = signal(50);
  public page = signal(1);
  public isFirstPage: Signal<boolean> = computed(() => this.page() === 1);
  public readonly pokemonSpriteTypePath = PokemonSpriteTypePath;

  public readonly languageService = inject(LanguageService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _pokeApiService = inject(PokeApiService);
  private readonly _translate = inject(TranslateService);
  private readonly _filtersService = inject(FiltersService);

  private hasMore = computed(() => this.data().length < this.pokemonCount());

  loadMoreAnchor = viewChild<ElementRef<HTMLElement>>('loadMoreAnchor');

  private observer?: IntersectionObserver;

  ngOnInit(): void {
    this._translate.onLangChange
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => {
        this.resetAndLoad();
      });

    this.resetAndLoad();
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && this.hasMore() && !this.isLoading()) {
          this.onScroll();
        }
      },
      {
        root: null,
        rootMargin: '200px',
        threshold: 0,
      }
    );

    const loadMoreAnchor = this.loadMoreAnchor();
    if (loadMoreAnchor) {
      this.observer.observe(loadMoreAnchor.nativeElement);
    }
  }

  public onScroll(): void {
    if (this.isLoading() || !this.hasMore()) {
      return;
    }

    this.page.update((p) => p + 1);
    this.loadPokemons();
  }

  public changePage(event: PageEvent): void {
    this.pageSize.set(event.pageSize);
    this.page.set(event.pageIndex + 1);
    this.resetAndLoad();
  }

  public onFilterSearch(): void {
    this.resetAndLoad();
  }

  private resetAndLoad(): void {
    this.page.set(1);
    this.data.set([]);
    this.loadPokemons(true);
  }

  private loadPokemons(reset = false): void {
    if (this.isLoading()) {
      return;
    }

    this.isLoading.set(true);

    this._pokeApiService
      .getPokemons(
        this._filtersService.getHttpParams(this.page(), this.pageSize())
      )
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((result: PokemonPaginatedList) => {
        this.isLoading.set(false);

        this.data.update((current) =>
          reset ? result.data : [...current, ...result.data]
        );

        this.pokemonCount.set(result.total);
      });
  }
}
