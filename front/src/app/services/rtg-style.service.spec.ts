import { TestBed } from '@angular/core/testing';

import { RtgStyleService } from './rtg-style.service';

describe('RtgStyleService', () => {
  let service: RtgStyleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RtgStyleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
