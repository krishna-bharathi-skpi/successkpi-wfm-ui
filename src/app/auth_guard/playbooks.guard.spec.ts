import { TestBed } from '@angular/core/testing';

import { PlaybooksGuard } from './playbooks.guard';

describe('PlaybooksGuard', () => {
  let guard: PlaybooksGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PlaybooksGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
