import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AiMlScoringComponent } from './ai-ml-scoring.component';

describe('AiMlScoringComponent', () => {
  let component: AiMlScoringComponent;
  let fixture: ComponentFixture<AiMlScoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AiMlScoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AiMlScoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
