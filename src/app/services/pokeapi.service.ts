import { HttpClient } from '@angular/common/http';
import { PokemonPaginatedList } from '../interfaces/PokemonPaginatedList.interface';
import { Injectable } from '@angular/core';
import { Observable, of, map, concatMap } from 'rxjs';
import { CachingService } from './caching.service';
import { SidenavService } from './sidenav.service';
import { Pokemon } from '../interfaces/Pokemon.interface';
import { PokemonEvolution } from '../interfaces/PokemonEvolution.interface';
import { PokemonSpecy } from '../interfaces/PokemonSpecy.interface';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private baseUrl = 'http://localhost';

  constructor(
    private _httpClient: HttpClient,
    private _cachingService: CachingService,
    private _sidenavService: SidenavService
  ) {}

  private cachedGetRequest<T>(route: string): Observable<T> {
    if (this._cachingService.hasKey(route)) {
      return of(this._cachingService.getData<T>(route) as T);
    }
    return this._httpClient.get<T>(route).pipe(
      map((result: T) => {
        this._cachingService.setData<T>(route, result);
        return result;
      })
    );
  }

  public getAllPokemons(): Observable<PokemonPaginatedList> {
    return this.cachedGetRequest<PokemonPaginatedList>(
      `${this.baseUrl}/pokemon/?limit=5000`
    );
  }

  public getPokemon(name: string): Observable<Pokemon> {
    this._sidenavService.addNode(name, `pokemon/${name}`);

    return this.cachedGetRequest<Pokemon>(
      `${this.baseUrl}/pokemon/${name}`
    ).pipe(
      concatMap((result: Pokemon) => {
        if (result.species.evolution_chain_id) {
          return this.cachedGetRequest<Array<PokemonSpecy>>(
            `${this.baseUrl}/evolution/${result.species.evolution_chain_id}`
          ).pipe(
            map((data: Array<PokemonSpecy>) => {
              result.evolution = data;
              return result;
            })
          );
        }
        return of(result);
      })
    );
  }
}
