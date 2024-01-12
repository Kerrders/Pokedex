import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FilteredPokemonMoves } from 'src/app/interfaces/FilteredPokemonMoves.interface';
import { PokemonMove } from 'src/app/interfaces/PokemonMove.interface';
import versionGroups from '../../../assets/data/version_groups.json';
import { LanguageService } from 'src/app/services/language.service';

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

  constructor(public languageService: LanguageService) {}

  public ngOnInit(): void {
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

    this.allVersions = this.allVersions.filter((versionId) =>
      this.pokemonMoves?.some(
        (element) => element.version_group_id === parseInt(versionId)
      )
    );
    if (
      !this.allVersions.some((versionId) => versionId === this.currentVersion)
    ) {
      this.currentVersion = this.allVersions[0] ?? '1';
    }
  }
}
