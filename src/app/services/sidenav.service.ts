import { Injectable, signal, WritableSignal, inject } from '@angular/core';
import { PokemonSpeciesName } from '../interfaces/PokemonSpeciesName.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private readonly router = inject(Router);

  public nodes: WritableSignal<
    Array<{ name: Array<PokemonSpeciesName>; url: string }>
  > = signal([]);
  private readonly maxNodes = 10;

  public removeNode(name: Array<PokemonSpeciesName>): void {
    this.nodes.set(this.nodes().filter((node) => node.name !== name));
    this.router.navigate(['']);
  }

  public addNode(name: Array<PokemonSpeciesName>, url: string): void {
    const nodes = this.nodes();

    if (
      nodes.some((node) => JSON.stringify(node.name) === JSON.stringify(name))
    ) {
      return;
    }

    const updatedNodes = [
      ...nodes,
      {
        name: name,
        url: url,
      },
    ];
    this.nodes.set(
      updatedNodes.length > this.maxNodes
        ? updatedNodes.slice(-this.maxNodes)
        : updatedNodes,
    );
  }
}
