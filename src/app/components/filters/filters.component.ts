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
  ],
})
export class FiltersComponent implements OnInit {
  public readonly filtersService = inject(FiltersService);

  public nameChanged = new Subject<string>();
  public availableTypes: Array<PokemonTypeEnum> =
    PokemonTypeHelper.availableTypes;
  private readonly _destroyRef = inject(DestroyRef);

  public readonly search = output<void>();

  constructor() {
    effect(() => {
      this.search.emit();
    });
  }

  public ngOnInit(): void {
    this.nameChanged
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe((name: string) => {
        this.filtersService.name.set(name);
        this.search.emit();
      });
  }
}
