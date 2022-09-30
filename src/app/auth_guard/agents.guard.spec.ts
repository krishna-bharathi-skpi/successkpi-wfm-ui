import { TestBed } from '@angular/core/testing';

import { AgentsGuard } from './agents.guard';

describe('AgentsGuard', () => {
  let guard: AgentsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AgentsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
