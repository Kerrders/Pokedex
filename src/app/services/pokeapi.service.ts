import { HttpClient } from '@angular/common/http';
import { PokemonPaginatedList } from '../interfaces/PokemonPaginatedList.interface';
import { Injectable } from '@angular/core';
import { Observable, of, map, forkJoin, concatMap } from 'rxjs';
import { PokemonDetails } from '../interfaces/PokemonDetails.interface';
import { CachingService } from './caching.service';
import { SidenavService } from './sidenav.service';
import { PokemonSpecies } from '../interfaces/PokemonSpecies.interface';
import { CollectedPokemonDetails } from '../interfaces/CollectedPokemonDetails.interface';
import { EvolutionChainRequest } from '../interfaces/EvolutionChainRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private baseUrl = 'https://pokeapi.co/api/v2';

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

  public getPokemon(name: string): Observable<CollectedPokemonDetails> {
    this._sidenavService.addNode(name, `pokemon/${name}`);

    return forkJoin({
      details: this.cachedGetRequest<PokemonDetails>(
        `${this.baseUrl}/pokemon/${name}`
      ),
      species: this.cachedGetRequest<PokemonSpecies>(
        `${this.baseUrl}/pokemon-species/${name}`
      ),
    }).pipe(
      concatMap((result: CollectedPokemonDetails) => {
        if (result.species.evolution_chain.url) {
          return this.cachedGetRequest<EvolutionChainRequest>(
            result.species.evolution_chain.url
          ).pipe(
            map((data: EvolutionChainRequest) => {
              result.evolution_chain = data;
              return result;
            })
          );
        }
        return of(result);
      })
    );
  }
}
