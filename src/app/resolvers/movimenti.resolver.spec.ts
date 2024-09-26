import { TestBed } from '@angular/core/testing';

import { MovimentiResolver } from './movimenti.resolver';

describe('MovimentiResolver', () => {
  let resolver: MovimentiResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MovimentiResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});