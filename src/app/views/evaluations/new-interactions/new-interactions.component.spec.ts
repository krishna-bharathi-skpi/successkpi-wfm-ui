import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInteractionsComponent } from './new-interactions.component';

describe('NewInteractionsComponent', () => {
  let component: NewInteractionsComponent;
  let fixture: ComponentFixture<NewInteractionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewInteractionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInteractionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
