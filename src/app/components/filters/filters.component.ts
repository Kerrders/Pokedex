import { Component, EventEmitter, OnInit, Output, effect } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { PokemonTypeEnum } from 'src/app/enums/PokemonTypesEnum';
import { PokemonTypeHelper } from 'src/app/helpers/pokemonTypeHelper';
import { FiltersService } from 'src/app/services/filters.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  public nameChanged = new Subject<string>();
  public availableTypes: Array<PokemonTypeEnum> =
    PokemonTypeHelper.availableTypes;

  @Output()
  public search = new EventEmitter<boolean>();

  constructor(public filtersService: FiltersService) {
    effect(() => {
      this.search.emit();
    });
  }

  public ngOnInit(): void {
    this.nameChanged
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((name: string) => {
        this.filtersService.name.set(name);
        this.search.emit();
      });
  }
}
