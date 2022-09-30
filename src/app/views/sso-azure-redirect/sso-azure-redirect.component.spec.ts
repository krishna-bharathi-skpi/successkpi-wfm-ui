import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoAzureRedirectComponent } from './sso-azure-redirect.component';

describe('SsoAzureRedirectComponent', () => {
  let component: SsoAzureRedirectComponent;
  let fixture: ComponentFixture<SsoAzureRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoAzureRedirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoAzureRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
