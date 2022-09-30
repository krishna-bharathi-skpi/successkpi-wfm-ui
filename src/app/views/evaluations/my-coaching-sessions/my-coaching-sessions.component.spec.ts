import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCoachingSessionsComponent } from './my-coaching-sessions.component';

describe('MyCoachingSessionsComponent', () => {
  let component: MyCoachingSessionsComponent;
  let fixture: ComponentFixture<MyCoachingSessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCoachingSessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCoachingSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
