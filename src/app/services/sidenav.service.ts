import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  public nodes: Array<{ name: string; url: string }> = [];
  private _maxNodes: number = 10;

  public removeNode(name: string): void {
    this.nodes = this.nodes.filter((node) => node.name !== name);
  }

  public addNode(name: string, url: string): void {
    if (this.nodes.some((node) => node.name === name)) {
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
