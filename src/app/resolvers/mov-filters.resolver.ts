import { ResolveFn } from '@angular/router';
import { MovimentiFilters } from '../services/movimenti.service';

export const movimentiFiltersResolver: ResolveFn<MovimentiFilters> = (route) => {
  return route.queryParams as MovimentiFilters;
};