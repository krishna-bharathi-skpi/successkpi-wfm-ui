import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformRegistersComponent } from './platform-registers.component';

describe('PlatformRegistersComponent', () => {
  let component: PlatformRegistersComponent;
  let fixture: ComponentFixture<PlatformRegistersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformRegistersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformRegistersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
