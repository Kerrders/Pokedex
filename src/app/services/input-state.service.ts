import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InputStateService {
  private inputValues: any = {};

  public setInputValue<T>(inputName: string, value: T): void {
    this.inputValues[inputName] = value;
  }

  public getInputValue<T>(inputName: string): T {
    return this.inputValues[inputName];
  }
}
