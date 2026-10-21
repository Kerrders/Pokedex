import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FiltersComponent } from './filters.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { PokemonTypeEnum } from 'src/app/enums/PokemonTypesEnum';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [TranslateModule.forRoot(),
        BrowserAnimationsModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove only the selected type filter', () => {
    component.filtersService.types.set([
      PokemonTypeEnum.GRASS,
      PokemonTypeEnum.FIRE,
    ]);

    component.removeType(PokemonTypeEnum.GRASS);

    expect(component.filtersService.types()).toEqual([PokemonTypeEnum.FIRE]);
  });

  it('should reset the name and type filters together', () => {
    component.nameInput = 'pikachu';
    component.filtersService.name.set('pikachu');
    component.filtersService.types.set([PokemonTypeEnum.ELECTRIC]);

    component.resetFilters();

    expect(component.nameInput).toBe('');
    expect(component.filtersService.name()).toBe('');
    expect(component.filtersService.types()).toEqual([]);
  });
});
