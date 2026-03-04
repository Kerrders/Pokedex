import { Component, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PokemonStat } from 'src/app/interfaces/PokemonStat.interface';
import { ColorForStatusValuePipe } from '../../pipes/color-for-status-value.pipe';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-pokemon-status-table',
  templateUrl: './status-table.component.html',
  styleUrls: ['./status-table.component.scss'],
  imports: [
    MatTableModule,
    TranslateModule,
    ColorForStatusValuePipe
],
})
export class StatusTableComponent {
  public pokemonStats = input<Array<PokemonStat>>([]);

  public displayedColumns: Array<string> = ['name', 'value', 'valueVisual'];
}
