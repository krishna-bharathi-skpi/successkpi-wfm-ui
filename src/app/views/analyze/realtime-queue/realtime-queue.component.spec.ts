import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtimeQueueComponent } from './realtime-queue.component';

describe('RealtimeQueueComponent', () => {
  let component: RealtimeQueueComponent;
  let fixture: ComponentFixture<RealtimeQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealtimeQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtimeQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
