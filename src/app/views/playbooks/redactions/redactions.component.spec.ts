import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedactionsComponent } from './redactions.component';

describe('RedactionsComponent', () => {
  let component: RedactionsComponent;
  let fixture: ComponentFixture<RedactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
