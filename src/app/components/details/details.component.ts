import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public isLoading: boolean = true;
  public pokemonData: any;
  private name: string;

  constructor(
    private _httpClient: HttpClient,
    private _route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.name = params['name'];
      this.loadData();
    });
  }

  private loadData(): void {
    this.isLoading = true;
    this._httpClient
      .get<any>(`https://pokeapi.co/api/v2/pokemon/${this.name}`)
      .subscribe((result: any) => {
        this.pokemonData = result;
        this.isLoading = false;
      });
  }
}
