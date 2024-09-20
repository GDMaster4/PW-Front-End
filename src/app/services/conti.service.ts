import { Injectable } from '@angular/core';
import { Conto } from '../entities/conto.entity';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContiService
{
  private _conto$ = new BehaviorSubject<Conto | null>(null);
  conto$ = this._conto$.asObservable();
  
  constructor(protected http:HttpClient, protected authSrv:AuthService)
  {
    this.authSrv.currentUser$
      .subscribe(user => {
        if (user) {
          this.single();
        }
        else {
          this._conto$.next(null);
        }
      })
  }

  single()
  {
    this.http.get<Conto>("api/conto")
      .subscribe(conto=>{
        this._conto$.next(conto);
      });
  }

  add()
  {
    
  }
}