import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedSubscriptionComponent } from './shared-subscription.component';

describe('SharedSubscriptionComponent', () => {
  let component: SharedSubscriptionComponent;
  let fixture: ComponentFixture<SharedSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
