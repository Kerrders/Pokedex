import { Pipe, PipeTransform } from '@angular/core';

const typeColorMap: { [type: string]: string } = {
  normal: '#A0A0A0',
  fire: '#CF3500',
  water: '#67AEFA',
  grass: '#228B22',
  electric: '#DFDF00',
  ice: '#70D8E6',
  fighting: '#A0A0A0',
  poison: '#7360DB',
  ground: '#6B3513',
  flying: '#87CEEB',
  psychic: '#DF59B4',
  bug: '#70EE70',
  rock: '#898989',
  ghost: '#D0C67C',
  dragon: '#507080',
  dark: '#000000',
  steel: '#90A4CE',
  fairy: '#DF96B1',
};

@Pipe({
  name: 'colorForType',
})
export class ColorForTypePipe implements PipeTransform {
  transform(type: string): string {
    return typeColorMap[type] ?? 'primary';
  }
}
