import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/material-module';

import { TypeEffectivenessTableComponent } from './type-effectiveness-table.component';

describe('TypeEffectivenessTableComponent', () => {
  let component: TypeEffectivenessTableComponent;
  let fixture: ComponentFixture<TypeEffectivenessTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TypeEffectivenessTableComponent],
      imports: [MaterialModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TypeEffectivenessTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
