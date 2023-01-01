import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageHelper } from 'src/app/helpers/languageHelper';
import { PokemonMoves } from 'src/app/interfaces/PokemonMoves.interface';
import versionGroups from '../../../assets/data/version_groups.json';

@Component({
  selector: 'app-move-table',
  templateUrl: './move-table.component.html',
  styleUrls: ['./move-table.component.scss'],
})
export class MoveTableComponent implements OnInit, OnChanges {
  @Input()
  public pokemonMoves: Array<PokemonMoves>;
  public filteredMoves: Array<any>;

  public allVersions: Array<string> = versionGroups.map(
    (versionGroup) => versionGroup.identifier as string
  );
  public currentVersion = 'omega-ruby-alpha-sapphire';
  public currentLearnType = 'level-up';

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
      const versionData = element.version_group_details.find(
        (versionData: any) =>
          versionData.version_group.name === this.currentVersion
      );
      if (
        versionData &&
        versionData.move_learn_method.name === this.currentLearnType
      ) {
        this.filteredMoves.push({
          name: element.move.name,
          level: versionData.level_learned_at,
          method: versionData.move_learn_method.name,
        });
      }
    });

    this.filteredMoves = this.filteredMoves.sort(function (a, b) {
      return a.level - b.level;
    });
  }
}
