import { Window } from 'happy-dom';
import { beforeEach } from 'vitest';

const storage = new Window().localStorage;
Object.defineProperty(globalThis, 'localStorage', {
  configurable: true,
  value: storage,
});

Object.defineProperty(globalThis, 'IntersectionObserver', {
  configurable: true,
  value: class {
    observe(): void {}
  },
});

beforeEach(() => localStorage.clear());
