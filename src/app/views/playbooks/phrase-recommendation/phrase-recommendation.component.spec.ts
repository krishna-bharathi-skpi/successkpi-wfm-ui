import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhraseRecommendationComponent } from './phrase-recommendation.component';

describe('PhraseRecommendationComponent', () => {
  let component: PhraseRecommendationComponent;
  let fixture: ComponentFixture<PhraseRecommendationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhraseRecommendationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhraseRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
