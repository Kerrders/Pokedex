import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CachingService {
  private _cachedData: { [key: string]: unknown } = {};

  public setData(cacheKey: string, data: unknown): unknown {
    return (this._cachedData[cacheKey] = data);
  }

  public getData(cacheKey: string): unknown {
    return this._cachedData[cacheKey];
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
