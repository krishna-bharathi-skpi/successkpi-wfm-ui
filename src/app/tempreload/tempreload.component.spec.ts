import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempreloadComponent } from './tempreload.component';

describe('TempreloadComponent', () => {
  let component: TempreloadComponent;
  let fixture: ComponentFixture<TempreloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempreloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempreloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
