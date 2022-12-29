import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/material-module';

import { MoveTableComponent } from './move-table.component';

describe('MoveTableComponent', () => {
  let component: MoveTableComponent;
  let fixture: ComponentFixture<MoveTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoveTableComponent],
      imports: [MaterialModule, TranslateModule.forRoot(), FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MoveTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
