import { TestBed } from '@angular/core/testing';

import { ContiService } from './conti.service';

describe('ContiService', () => {
  let service: ContiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
