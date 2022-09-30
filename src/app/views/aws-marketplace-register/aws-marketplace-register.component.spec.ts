import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwsMarketplaceRegisterComponent } from './aws-marketplace-register.component';

describe('AwsMarketplaceRegisterComponent', () => {
  let component: AwsMarketplaceRegisterComponent;
  let fixture: ComponentFixture<AwsMarketplaceRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwsMarketplaceRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwsMarketplaceRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
