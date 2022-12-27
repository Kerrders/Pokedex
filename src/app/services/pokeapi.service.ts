import { HttpClient } from '@angular/common/http';
import { PokemonPaginatedList } from '../interfaces/PokemonPaginatedList.interface';
import { Injectable } from '@angular/core';
import { Observable, of, tap, map } from 'rxjs';
import { PokemonDetails } from '../interfaces/PokemonDetails.interface';
import { CachingService } from './caching.service';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(
    private _httpClient: HttpClient,
    private _cachingService: CachingService
  ) {}

  public getAllPokemons(): Observable<PokemonPaginatedList> {
    if (this._cachingService.hasKey('allPokemons')) {
      return of(
        this._cachingService.getData('allPokemons') as PokemonPaginatedList
      );
    }
    return this._httpClient
      .get<PokemonPaginatedList>(`${this.baseUrl}/pokemon/?limit=5000`)
      .pipe(
        map((result: PokemonPaginatedList) => {
          this._cachingService.setData('allPokemons', result);
          return result;
        })
      );
  }

  public getPokemon(name: string): Observable<PokemonDetails> {
    if (this._cachingService.hasKey(name)) {
      return of(this._cachingService.getData(name) as PokemonDetails);
    }
    return this._httpClient
      .get<PokemonDetails>(`${this.baseUrl}/pokemon/${name}`)
      .pipe(
        map((result: PokemonDetails) => {
          this._cachingService.setData(name, result);
          return result;
        })
      );
  }
}
