import { Injectable, signal, WritableSignal } from '@angular/core';
import { PokemonSpeciesName } from '../interfaces/PokemonSpeciesName.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  constructor(private _router: Router) {}

  public nodes: WritableSignal<
    Array<{ name: Array<PokemonSpeciesName>; url: string }>
  > = signal([]);
  private readonly _maxNodes = 10;

  public removeNode(name: Array<PokemonSpeciesName>): void {
    this.nodes.set(this.nodes().filter((node) => node.name !== name));
    this._router.navigate(['']);
  }

  public addNode(name: Array<PokemonSpeciesName>, url: string): void {
    if (
      this.nodes().some(
        (node) => JSON.stringify(node.name) === JSON.stringify(name)
      )
    ) {
      return;
    }

    if (this.nodes.length >= this._maxNodes) {
      this.nodes().shift();
    }

    this.nodes().push({
      name: name,
      url: url,
    });
  }
}
