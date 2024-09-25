import { TestBed } from '@angular/core/testing';

import { MovimentiResolver } from './mov.resolver';

describe('ProductsResolver', () => {
  let resolver: MovimentiResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MovimentiResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});