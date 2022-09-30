import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtimeQueueStatusComponent } from './realtime-queue-status.component';

describe('RealtimeQueueStatusComponent', () => {
  let component: RealtimeQueueStatusComponent;
  let fixture: ComponentFixture<RealtimeQueueStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealtimeQueueStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtimeQueueStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
