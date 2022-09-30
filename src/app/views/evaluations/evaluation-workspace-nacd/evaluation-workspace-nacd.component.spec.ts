import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationWorkspaceNacdComponent } from './evaluation-workspace-nacd.component';

describe('EvaluationWorkspaceNacdComponent', () => {
  let component: EvaluationWorkspaceNacdComponent;
  let fixture: ComponentFixture<EvaluationWorkspaceNacdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationWorkspaceNacdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationWorkspaceNacdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
