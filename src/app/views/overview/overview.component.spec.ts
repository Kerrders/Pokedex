import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MaterialModule } from 'src/app/material-module';
import { TypeToNamePipe } from 'src/app/pipes/type-to-name.pipe';

import { OverviewComponent } from './overview.component';
import { FiltersComponent } from 'src/app/components/filters/filters.component';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverviewComponent, TypeToNamePipe, FiltersComponent],
      imports: [
        MaterialModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        InfiniteScrollModule,
        TranslateModule.forRoot(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
