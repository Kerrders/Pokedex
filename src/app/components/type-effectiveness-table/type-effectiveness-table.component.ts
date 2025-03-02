import { Component, Input } from '@angular/core';
import { TypeEffectiveness } from 'src/app/interfaces/TypeEffectiveness';
import { TypeToNamePipe } from '../../pipes/type-to-name.pipe';
import { ColorForTypePipe } from '../../pipes/color-for-type.pipe';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatChipsModule } from '@angular/material/chips';

@Component({
    selector: 'app-pokemon-type-effectiveness-table',
    templateUrl: './type-effectiveness-table.component.html',
    styleUrls: ['./type-effectiveness-table.component.scss'],
    imports: [
        CommonModule,
        TranslateModule,
        MatTableModule,
        MatChipsModule,
        TypeToNamePipe,
        ColorForTypePipe,
    ]
})
export class TypeEffectivenessTableComponent {
  @Input()
  public typeEffectiveness: Array<TypeEffectiveness>;

  public displayedColumns: Array<string> = ['type', 'damage'];
}
