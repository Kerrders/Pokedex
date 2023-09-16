import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InputStateService {
  private inputValues: any = {};

  public setInputValue(inputName: string, value: any): void {
    this.inputValues[inputName] = value;
  }

  public getInputValue(inputName: string): any {
    return this.inputValues[inputName];
  }
}
