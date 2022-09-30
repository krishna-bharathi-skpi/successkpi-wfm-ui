import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactSubscriptionComponent } from './contact-subscription.component';

describe('ContactSubscriptionComponent', () => {
  let component: ContactSubscriptionComponent;
  let fixture: ComponentFixture<ContactSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
