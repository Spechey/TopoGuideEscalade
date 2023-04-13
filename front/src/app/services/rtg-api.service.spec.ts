import { TestBed } from '@angular/core/testing';

import { RtgApiService } from './rtg-api.service';

describe('RtgApiService', () => {
  let service: RtgApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RtgApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
