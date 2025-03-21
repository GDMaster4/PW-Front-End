import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { movimentiFiltersResolver } from './movimenti-filters.resolver';

describe('movimentiFiltersResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => movimentiFiltersResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
