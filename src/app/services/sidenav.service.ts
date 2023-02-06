import { Injectable } from '@angular/core';
import { PokemonSpeciesName } from '../interfaces/PokemonSpeciesName.interface';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  public nodes: Array<{ name: Array<PokemonSpeciesName>; url: string }> = [];
  private _maxNodes = 10;

  public removeNode(name: Array<PokemonSpeciesName>): void {
    this.nodes = this.nodes.filter((node) => node.name !== name);
  }

  public addNode(name: Array<PokemonSpeciesName>, url: string): void {
    if (
      this.nodes.some(
        (node) => JSON.stringify(node.name) === JSON.stringify(name)
      )
    ) {
      return;
    }

    if (this.nodes.length >= this._maxNodes) {
      this.nodes.shift();
    }

    this.nodes.push({
      name: name,
      url: url,
    });
  }
}
