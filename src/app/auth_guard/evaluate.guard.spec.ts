import { TestBed } from '@angular/core/testing';

import { EvaluateGuard } from './evaluate.guard';

describe('EvaluateGuard', () => {
  let guard: EvaluateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EvaluateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
