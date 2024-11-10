import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MoveTableComponent } from './move-table.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MoveTableComponent', () => {
  let component: MoveTableComponent;
  let fixture: ComponentFixture<MoveTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [TranslateModule.forRoot(),
        BrowserAnimationsModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
