import { Injectable } from '@angular/core';
import { Conto } from '../entities/conto.entity';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { MovimentiService } from './movimenti.service';

@Injectable({
  providedIn: 'root'
})
export class ContoService
{
  private _conto$ = new BehaviorSubject<Conto | null>(null);
  conto$ = this._conto$.asObservable();
  
  constructor(protected http:HttpClient, protected authSrv:AuthService, protected movSrv:MovimentiService)
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
    this.http.post<Conto>("/api/conto/add",{})
      .subscribe(addConto => {
        this._conto$.next(addConto);
        this.single();
      },error => {
        console.error(error);
      });
    this.movSrv.add(0,"Apertura Conto","Apertura del conto");
  }

  list()
  {
    const conti= this.http.get<Conto[]>("/api/conto/all")
      .pipe(
        map(conti => conti.filter(conto => conto.iban !== this._conto$.value?.iban))
      );
    
    return conti;
  }

  idConto()
  {
    let id="";
    this.conto$.subscribe(conto=>id=conto!.id);
    return id;
  }
}