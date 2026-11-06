import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { EvolutionTabComponent } from './evolution-tab.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('EvolutionTabComponent', () => {
  let component: EvolutionTabComponent;
  let fixture: ComponentFixture<EvolutionTabComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [BrowserAnimationsModule, RouterTestingModule],
    providers: [
      provideTranslateService(),
      provideHttpClient(withInterceptorsFromDi()),
      provideHttpClientTesting(),
    ],
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvolutionTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
