import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CachingService {
  private _cachedData: { [key: string]: unknown } = {};

  public setData<T>(cacheKey: string, data: T): void {
    this._cachedData[cacheKey] = data;
  }

  public getData<T>(cacheKey: string): T {
    return this._cachedData[cacheKey] as T;
  }

  public hasKey(cacheKey: string): boolean {
    return (
      this._cachedData[cacheKey] !== undefined &&
      this._cachedData[cacheKey] !== null
    );
  }

  public clearCache(cacheKey: string): void {
    delete this._cachedData[cacheKey];
  }
}
