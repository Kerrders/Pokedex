import { HttpClient } from '@angular/common/http';
import { PokemonPaginatedList } from '../interfaces/PokemonPaginatedList.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private _httpClient: HttpClient) {}

  public getAllPokemons(): Observable<PokemonPaginatedList> {
    return this._httpClient.get<PokemonPaginatedList>(
      `${this.baseUrl}/pokemon/?limit=5000`
    );
  }

  public getPokemon(name: string): Observable<any> {
    return this._httpClient.get<PokemonPaginatedList>(
      `${this.baseUrl}/pokemon/${name}`
    );
  }
}
