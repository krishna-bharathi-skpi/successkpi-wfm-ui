import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicDetectionComponent } from './topic-detection.component';

describe('TopicDetectionComponent', () => {
  let component: TopicDetectionComponent;
  let fixture: ComponentFixture<TopicDetectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicDetectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
