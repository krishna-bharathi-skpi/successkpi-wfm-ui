import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccesskpiSettingComponent } from './successkpi-setting.component';

describe('SuccesskpiSettingComponent', () => {
  let component: SuccesskpiSettingComponent;
  let fixture: ComponentFixture<SuccesskpiSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccesskpiSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccesskpiSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
