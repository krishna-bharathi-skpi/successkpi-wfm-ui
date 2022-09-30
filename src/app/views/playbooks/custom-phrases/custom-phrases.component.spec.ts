import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPhrasesComponent } from './custom-phrases.component';

describe('CustomPhrasesComponent', () => {
  let component: CustomPhrasesComponent;
  let fixture: ComponentFixture<CustomPhrasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomPhrasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPhrasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
