import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Pokemon } from '../interfaces/Pokemon.interface';
import { PokeApiService } from '../services/pokeapi.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonResolver implements Resolve<Observable<Pokemon>> {
  constructor(private _pokeApiService: PokeApiService) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<Pokemon> {
    const name = route.paramMap.get('name');
    if (!name) {
      return of();
    }
    return this._pokeApiService.getPokemon(name);
  }
}
