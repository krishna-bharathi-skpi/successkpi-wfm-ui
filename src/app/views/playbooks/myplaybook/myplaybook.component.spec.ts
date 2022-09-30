import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyplaybookComponent } from './myplaybook.component';

describe('MyplaybookComponent', () => {
  let component: MyplaybookComponent;
  let fixture: ComponentFixture<MyplaybookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyplaybookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyplaybookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
