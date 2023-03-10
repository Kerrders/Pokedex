import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageHelper } from 'src/app/helpers/languageHelper';
import { FilteredPokemonMoves } from 'src/app/interfaces/FilteredPokemonMoves.interface';
import { PokemonMove } from 'src/app/interfaces/PokemonMove.interface';
import versionGroups from '../../../assets/data/version_groups.json';

@Component({
  selector: 'app-move-table',
  templateUrl: './move-table.component.html',
  styleUrls: ['./move-table.component.scss'],
})
export class MoveTableComponent implements OnInit, OnChanges {
  @Input()
  public pokemonMoves: Array<PokemonMove>;
  public filteredMoves: Array<FilteredPokemonMoves>;

  public allVersions: Array<string> = versionGroups
    .map((versionGroup) => versionGroup.id)
    .filter((value) => value);
  public currentVersion = '1';
  public currentLearnType = 1;

  public displayedColumns: Array<string> = ['name', 'level'];
  public langId: number = LanguageHelper.getLanguageId();

  constructor(private _translate: TranslateService) {}

  public ngOnInit(): void {
    this._translate.onLangChange.subscribe(() => {
      this.langId = LanguageHelper.getLanguageId();
    });
    this.getData();
  }

  public ngOnChanges(): void {
    this.getData();
  }

  public getData(): void {
    this.filteredMoves = [];
    this.pokemonMoves?.forEach((element) => {
      if (
        element.version_group_id === parseInt(this.currentVersion) &&
        element.pokemon_move_method_id === this.currentLearnType
      ) {
        this.filteredMoves.push({
          id: element.move_id,
          level: element.level,
          method: element.pokemon_move_method_id,
          names: element.names,
        });
      }
    });

    this.filteredMoves = this.filteredMoves.sort(function (a, b) {
      return a.level - b.level;
    });
  }
}
