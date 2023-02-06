import { Component, Input } from '@angular/core';
import { PokemonStat } from 'src/app/interfaces/PokemonStat.interface';

@Component({
  selector: 'app-pokemon-status-table',
  templateUrl: './status-table.component.html',
  styleUrls: ['./status-table.component.scss'],
})
export class StatusTableComponent {
  @Input()
  public pokemonStats: Array<PokemonStat>;

  public displayedColumns: Array<string> = ['name', 'value', 'valueVisual'];
}
