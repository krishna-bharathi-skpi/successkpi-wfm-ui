import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoAzureLoginComponent } from './sso-azure-login.component';

describe('SsoAzureLoginComponent', () => {
  let component: SsoAzureLoginComponent;
  let fixture: ComponentFixture<SsoAzureLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoAzureLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoAzureLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
