import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Pokemon } from '../interfaces/Pokemon.interface';
import { PokeApiService } from '../services/pokeapi.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonResolver {
  private readonly pokeApiService = inject(PokeApiService);

  public resolve(route: ActivatedRouteSnapshot): Observable<Pokemon> {
    const name = route.paramMap.get('name');
    if (!name) {
      return of();
    }
    return this.pokeApiService.getPokemon(name);
  }
}
