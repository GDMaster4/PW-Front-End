import { Injectable } from '@angular/core';
import { Conto } from '../entities/conto.entity';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { MovimentiService } from './movimenti.service';
import { AlertComponent } from '../components/alert/alert.component';
import { enviroment } from '../../../collegamento';

@Injectable({
  providedIn: 'root'
})
export class ContoService
{
  private _conto$ = new BehaviorSubject<Conto | null>(null);
  conto$ = this._conto$.asObservable();
  protected alert = new AlertComponent();
  
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
    this.http.get<Conto>(`${enviroment.apiUrl}/api/conto`)
      .subscribe(conto=>{
        this._conto$.next(conto);
      });
  }

  add()
  {
    this.http.post<Conto>(`${enviroment.apiUrl}/api/conto/add`,{})
      .subscribe(addConto => {
        this._conto$.next(addConto);
        this.single();
      },error => {
        this.alert.showAlert(error);
      });
  }

  list()
  {
    const conti= this.http.get<Conto[]>(`${enviroment.apiUrl}/api/conto/all`)
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