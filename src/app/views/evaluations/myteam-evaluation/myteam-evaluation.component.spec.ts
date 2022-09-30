import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyteamEvaluationComponent } from './myteam-evaluation.component';

describe('MyteamEvaluationComponent', () => {
  let component: MyteamEvaluationComponent;
  let fixture: ComponentFixture<MyteamEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyteamEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyteamEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
