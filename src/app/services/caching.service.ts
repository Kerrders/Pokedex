import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CachingService {
  private cachedData: { [key: string]: unknown } = {};

  public setData<T>(cacheKey: string, data: T): void {
    this.cachedData[cacheKey] = data;
  }

  public getData<T>(cacheKey: string): T {
    return this.cachedData[cacheKey] as T;
  }

  public hasKey(cacheKey: string): boolean {
    return (
      this.cachedData[cacheKey] !== undefined &&
      this.cachedData[cacheKey] !== null
    );
  }

  public clearCache(cacheKey: string): void {
    delete this.cachedData[cacheKey];
  }
}
