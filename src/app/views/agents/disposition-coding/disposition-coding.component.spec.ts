import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispositionCodingComponent } from './disposition-coding.component';

describe('DispositionCodingComponent', () => {
  let component: DispositionCodingComponent;
  let fixture: ComponentFixture<DispositionCodingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispositionCodingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispositionCodingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
