import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtimeAgentStatusComponent } from './realtime-agent-status.component';

describe('RealtimeAgentStatusComponent', () => {
  let component: RealtimeAgentStatusComponent;
  let fixture: ComponentFixture<RealtimeAgentStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealtimeAgentStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtimeAgentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
