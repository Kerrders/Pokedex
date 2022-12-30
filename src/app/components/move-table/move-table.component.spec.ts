import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/material-module';
import { VersionNamePipe } from 'src/app/pipes/version-name.pipe';

import { MoveTableComponent } from './move-table.component';

describe('MoveTableComponent', () => {
  let component: MoveTableComponent;
  let fixture: ComponentFixture<MoveTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoveTableComponent, VersionNamePipe],
      imports: [
        MaterialModule,
        TranslateModule.forRoot(),
        FormsModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MoveTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
