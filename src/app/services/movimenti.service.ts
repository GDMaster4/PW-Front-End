import { Injectable } from '@angular/core';
import { Movimento } from '../entities/movimento.entity';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { isNil, omitBy } from 'lodash';

export interface MovimentiFilters
{
  numero:number;
  categoria?:string;
  firstData?:string;
  secondData?:string;
}

@Injectable({
  providedIn: 'root'
})
export class MovimentiService
{
  protected _movimenti$ = new BehaviorSubject<Movimento[]>([]);
  movimenti$ = this._movimenti$.asObservable();
  private hasFiltro=false;

  constructor(protected http:HttpClient, protected authSrv:AuthService) { }

  fetch(contoId:string)
  {
    this.http.get<Movimento[]>(`/api/movimenti/${contoId}?numero=5`)
      .subscribe(movimenti=>{
        this._movimenti$.next(movimenti);
      });
  }

  list(filters:MovimentiFilters)
  {
    let q=omitBy(filters,isNil);
  }

  updateMov()
  {
  }

  add()
  {
  }
}
