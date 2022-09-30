import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleDeliveryComponent } from './schedule-delivery.component';

describe('ScheduleDeliveryComponent', () => {
  let component: ScheduleDeliveryComponent;
  let fixture: ComponentFixture<ScheduleDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
