import { TestBed } from '@angular/core/testing';

import { WfmGuard } from './wfm.guard';

describe('WfmGuard', () => {
  let guard: WfmGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WfmGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
