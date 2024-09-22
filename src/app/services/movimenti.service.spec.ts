import { TestBed } from '@angular/core/testing';

import { MovimentiService } from './movimenti.service';

describe('MovimentiService', () => {
  let service: MovimentiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovimentiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
