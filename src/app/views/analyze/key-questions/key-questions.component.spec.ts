import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyQuestionsComponent } from './key-questions.component';

describe('KeyQuestionsComponent', () => {
  let component: KeyQuestionsComponent;
  let fixture: ComponentFixture<KeyQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
