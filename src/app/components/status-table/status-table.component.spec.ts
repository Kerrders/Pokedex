import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/material-module';

import { StatusTableComponent } from './status-table.component';

describe('StatusTableComponent', () => {
  let component: StatusTableComponent;
  let fixture: ComponentFixture<StatusTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatusTableComponent],
      imports: [MaterialModule],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
