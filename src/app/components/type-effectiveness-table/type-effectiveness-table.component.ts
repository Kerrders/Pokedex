import { Component, Input } from '@angular/core';
import { TypeEffectiveness } from 'src/app/interfaces/TypeEffectiveness';

@Component({
  selector: 'app-pokemon-type-effectiveness-table',
  templateUrl: './type-effectiveness-table.component.html',
  styleUrls: ['./type-effectiveness-table.component.scss'],
})
export class TypeEffectivenessTableComponent {
  @Input()
  public typeEffectiveness: Array<TypeEffectiveness>;

  public displayedColumns: Array<string> = ['type', 'damage'];
}
