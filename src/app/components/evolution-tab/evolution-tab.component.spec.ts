import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionTabComponent } from './evolution-tab.component';

describe('EvolutionTabComponent', () => {
  let component: EvolutionTabComponent;
  let fixture: ComponentFixture<EvolutionTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvolutionTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvolutionTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
