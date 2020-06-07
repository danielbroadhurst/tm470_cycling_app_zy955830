import { TestBed } from '@angular/core/testing';

import { CyclingClubService } from './cycling-club.service';

describe('CyclingClubService', () => {
  let service: CyclingClubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CyclingClubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
