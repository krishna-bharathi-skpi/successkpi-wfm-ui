import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtimeAgentComponent } from './realtime-agent.component';

describe('RealtimeAgentComponent', () => {
  let component: RealtimeAgentComponent;
  let fixture: ComponentFixture<RealtimeAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealtimeAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtimeAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
