import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformSettingComponent } from './platform-setting.component';

describe('PlatformSettingComponent', () => {
  let component: PlatformSettingComponent;
  let fixture: ComponentFixture<PlatformSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
