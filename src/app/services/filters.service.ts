import { Injectable, WritableSignal, signal } from '@angular/core';
import { PokemonTypeEnum } from '../enums/PokemonTypesEnum';
import { HttpParams } from '@angular/common/http';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  public name: WritableSignal<string> = signal('');
  public types: WritableSignal<Array<PokemonTypeEnum>> = signal([]);

  constructor(public languageService: LanguageService) {}

  public getHttpParams(page: number, pageSize: number): HttpParams {
    let params = new HttpParams()
      .set('page', page)
      .set('perPage', pageSize)
      .set('langId', this.languageService.getLanguageId());

    const name = this.name();
    if (name?.length > 3) {
      params = params.set('name', name);
    }

    const types = this.types();
    if (types?.length) {
      for (const typeIds of types) {
        params = params.append('typeIds[]', typeIds);
      }
    }

    return params;
  }
}
