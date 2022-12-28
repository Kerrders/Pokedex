import { HttpClient } from '@angular/common/http';
import { PokemonPaginatedList } from '../interfaces/PokemonPaginatedList.interface';
import { Injectable } from '@angular/core';
import { Observable, of, tap, map } from 'rxjs';
import { PokemonDetails } from '../interfaces/PokemonDetails.interface';
import { CachingService } from './caching.service';
import { SidenavService } from './sidenav.service';

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
      return of(this._cachingService.getData(route) as T);
    }
    return this._httpClient.get<T>(route).pipe(
      map((result: T) => {
        this._cachingService.setData(route, result);
        return result;
      })
    );
  }

  public getAllPokemons(): Observable<PokemonPaginatedList> {
    return this.cachedGetRequest<PokemonPaginatedList>(
      `${this.baseUrl}/pokemon/?limit=5000`
    );
  }

  public getPokemon(name: string): Observable<PokemonDetails> {
    this._sidenavService.addNode(name, `pokemon/${name}`);
    return this.cachedGetRequest<PokemonDetails>(
      `${this.baseUrl}/pokemon/${name}`
    );
  }
}
