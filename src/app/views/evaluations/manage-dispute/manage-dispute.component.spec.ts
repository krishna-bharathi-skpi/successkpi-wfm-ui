import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDisputeComponent } from './manage-dispute.component';

describe('ManageDisputeComponent', () => {
  let component: ManageDisputeComponent;
  let fixture: ComponentFixture<ManageDisputeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDisputeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDisputeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
