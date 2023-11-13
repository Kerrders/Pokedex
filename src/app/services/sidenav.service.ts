import { Injectable } from '@angular/core';
import { PokemonSpeciesName } from '../interfaces/PokemonSpeciesName.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  constructor(private _router: Router) {}

  public nodes: Array<{ name: Array<PokemonSpeciesName>; url: string }> = [];
  private _maxNodes = 10;

  public removeNode(name: Array<PokemonSpeciesName>): void {
    this.nodes = this.nodes.filter((node) => node.name !== name);
    this._router.navigate(['']);
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
