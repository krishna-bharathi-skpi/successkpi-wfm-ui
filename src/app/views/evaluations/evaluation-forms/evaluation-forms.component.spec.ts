import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationFormsComponent } from './evaluation-forms.component';

describe('EvaluationFormsComponent', () => {
  let component: EvaluationFormsComponent;
  let fixture: ComponentFixture<EvaluationFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
