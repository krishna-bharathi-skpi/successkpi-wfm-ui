import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenesysUsersComponent } from './genesys-users.component';

describe('GenesysUsersComponent', () => {
  let component: GenesysUsersComponent;
  let fixture: ComponentFixture<GenesysUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenesysUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenesysUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
