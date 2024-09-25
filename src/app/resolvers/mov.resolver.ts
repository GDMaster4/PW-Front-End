import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Movimento } from '../entities/movimento.entity';
import { MovimentiFilters, MovimentiService } from '../services/movimenti.service';

@Injectable({
  providedIn: 'root'
})
export class MovimentiResolver implements Resolve<Movimento[]> 
{
  constructor(protected movSrv: MovimentiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Movimento[]>
  {
    const filters = route.queryParams as MovimentiFilters;
    return this.movSrv.list(filters);
  }
}
