import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeToName',
})
export class TypeToNamePipe implements PipeTransform {
  private readonly identifierMap = [
    { id: 1, identifier: 'normal' },
    { id: 2, identifier: 'fighting' },
    { id: 3, identifier: 'flying' },
    { id: 4, identifier: 'poison' },
    { id: 5, identifier: 'ground' },
    { id: 6, identifier: 'rock' },
    { id: 7, identifier: 'bug' },
    { id: 8, identifier: 'ghost' },
    { id: 9, identifier: 'steel' },
    { id: 10, identifier: 'fire' },
    { id: 11, identifier: 'water' },
    { id: 12, identifier: 'grass' },
    { id: 13, identifier: 'electric' },
    { id: 14, identifier: 'psychic' },
    { id: 15, identifier: 'ice' },
    { id: 16, identifier: 'dragon' },
    { id: 17, identifier: 'dark' },
    { id: 18, identifier: 'fairy' },
  ];
  transform(id: number | string): string {
    const mapping = this.identifierMap.find((m) => m.id === id);
    return mapping ? mapping.identifier : '';
  }
}
