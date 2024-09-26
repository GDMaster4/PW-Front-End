import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Movimento } from '../entities/movimento.entity';
import { MovimentiService, MovimentiFilters } from '../services/movimenti.service';

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