import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationWorkspaceComponent } from './evaluation-workspace.component';

describe('EvaluationWorkspaceComponent', () => {
  let component: EvaluationWorkspaceComponent;
  let fixture: ComponentFixture<EvaluationWorkspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationWorkspaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
