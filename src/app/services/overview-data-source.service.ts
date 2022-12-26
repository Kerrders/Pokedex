import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { PokemonList } from '../interfaces/PokemonList.interface';
import { PokemonPaginatedList } from '../interfaces/PokemonPaginatedList.interface';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root',
})
export class OverviewDataSourceService extends MatTableDataSource<PokemonList> {
  public totalResults = 0;
  public isLoading = false;

  constructor(private _httpClient: HttpClient) {
    super();
  }

  public onPaginationChange(e: PageEvent): void {
    this.loadPage(e.pageIndex, e.pageSize);
  }

  public loadPage(page: number, pageSize = 10): void {
    this._httpClient
      .get<PokemonPaginatedList>(
        `https://pokeapi.co/api/v2/pokemon/?limit=${pageSize}&offset=${
          page >= 1 ? pageSize * page : 0
        }`
      )
      .subscribe((result: PokemonPaginatedList) => {
        this.totalResults = result.count;
        this.data = result.results;
        this.isLoading = false;
        setTimeout(() => {
          if (this.paginator) {
            this.paginator.pageIndex = page;
            this.paginator.length = result.count;
          }
        });
      });
  }
}
