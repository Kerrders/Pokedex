import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  OnInit,
  output,
  effect,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { PokemonTypeEnum } from 'src/app/enums/PokemonTypesEnum';
import { PokemonTypeHelper } from 'src/app/helpers/pokemonTypeHelper';
import { FiltersService } from 'src/app/services/filters.service';
import { TypeToNamePipe } from '../../pipes/type-to-name.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    MatFormFieldModule,
    TypeToNamePipe,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
  ],
})
export class FiltersComponent implements OnInit {
  public readonly filtersService = inject(FiltersService);

  public nameChanged = new Subject<string>();
  public nameInput = this.filtersService.name();
  public availableTypes: Array<PokemonTypeEnum> =
    PokemonTypeHelper.availableTypes;
  private readonly destroyRef = inject(DestroyRef);

  public readonly triggerSearch = output<void>();

  constructor() {
    effect(() => {
      this.triggerSearch.emit();
    });
  }

  public ngOnInit(): void {
    this.nameChanged
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((name: string) => {
        if (this.filtersService.name() === name) {
          return;
        }
        this.filtersService.name.set(name);
        this.triggerSearch.emit();
      });
  }

  public onNameChange(name: string): void {
    this.nameInput = name;
    this.nameChanged.next(name);
  }

  public onTypesChange(types: Array<PokemonTypeEnum>): void {
    this.filtersService.types.set(types);
    this.triggerSearch.emit();
  }

  public removeType(type: PokemonTypeEnum): void {
    this.onTypesChange(this.filtersService.types().filter((item) => item !== type));
  }

  public removeName(): void {
    this.nameInput = '';
    this.nameChanged.next('');
    this.filtersService.name.set('');
    this.triggerSearch.emit();
  }

  public resetFilters(): void {
    this.nameInput = '';
    this.nameChanged.next('');
    this.filtersService.name.set('');
    this.filtersService.types.set([]);
    this.triggerSearch.emit();
  }
}
