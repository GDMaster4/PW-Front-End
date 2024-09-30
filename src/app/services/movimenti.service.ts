import { Injectable } from '@angular/core';
import { Movimento } from '../entities/movimento.entity';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { isNil, omitBy } from 'lodash';
import { ContoService } from './conto.service';
import { AlertComponent } from '../components/alert/alert.component';
import { enviroment } from '../../../collegamento';

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
  protected conto:string="";
  protected alert = new AlertComponent();

  constructor(protected http:HttpClient, protected contoSrv:ContoService)
  {
    this.contoSrv.conto$
      .subscribe(conto => {
        if (conto)
        {
          this.conto=this.contoSrv.idConto();
          this.fetch();
        }
        else {
          this._movimenti$.next([]);
        }
      })
  }

  fetch()
  {
    this.http.get<Movimento[]>(`${enviroment.apiUrl}/api/movimenti/${this.conto}?numero=5`)
      .subscribe(movimenti=>{
        this._movimenti$.next(movimenti);
      });
  }

  list(filters:MovimentiFilters)
  {
    if(filters.numero === undefined)
    { 
      if(filters.firstData !== undefined && filters.secondData !== undefined)
      {
        const firstData = new Date(filters.firstData);
        let year = firstData.getFullYear();
        let month = ('0' + (firstData.getMonth() + 1)).slice(-2); // Adding 1 to month since it's zero-based
        let day = ('0' + firstData.getDate()).slice(-2);
        const formattedfirstData = `${year}-${month}-${day}`;
        const secondData = new Date(filters.secondData);
        year = secondData.getFullYear();
        month = ('0' + (secondData.getMonth() + 1)).slice(-2); // Adding 1 to month since it's zero-based
        day = ('0' + secondData.getDate()).slice(-2);
        const formattedfsecondData = `${year}-${month}-${day}`;
        filters = {
          numero: 99999,
          firstData:formattedfirstData,
          secondData:formattedfsecondData,
          categoria:filters.categoria
        }
      }
      else
      {
        filters = {
          numero: 99999,
          categoria:filters.categoria
        }
      }
    }
    else
    {
      if(filters.firstData !== undefined && filters.secondData !== undefined)
      {
        const firstData = new Date(filters.firstData);
        let year = firstData.getFullYear();
        let month = ('0' + (firstData.getMonth() + 1)).slice(-2); // Adding 1 to month since it's zero-based
        let day = ('0' + firstData.getDate()).slice(-2);
        const formattedfirstData = `${year}-${month}-${day}`;
        const secondData = new Date(filters.secondData);
        year = secondData.getFullYear();
        month = ('0' + (secondData.getMonth() + 1)).slice(-2); // Adding 1 to month since it's zero-based
        day = ('0' + secondData.getDate()).slice(-2);
        const formattedfsecondData = `${year}-${month}-${day}`;
        filters = {
          numero: filters.numero,
          firstData:formattedfirstData,
          secondData:formattedfsecondData,
          categoria:filters.categoria
        }
      }
      else
      {
        filters = {
          numero: filters.numero,
          categoria:filters.categoria
        }
      }
    }

    console.log(filters)

    let q=omitBy(filters,isNil);
    const result=this.http.get<Movimento[]>(`${enviroment.apiUrl}/api/movimenti/${this.conto}`,{params: q});
    result.subscribe(movimenti=>{
      this._movimenti$.next(movimenti);
    });
    return result;
  }

  add(importo:number,categoria:string,descEstesa:string, destinatarioIban?:string)
  {
    let newMov;    
    if(destinatarioIban === undefined)
    {
      newMov={
        importo:importo,
        categoriaMovimento:categoria,
        descrizioneEstesa:descEstesa
      }
    }
    else
    {
      newMov={
        importo:importo,
        categoriaMovimento:categoria,
        descrizioneEstesa:descEstesa,
        destinatarioIban:destinatarioIban
      }
    }

    this.http.post<Movimento>(`${enviroment.apiUrl}/api/movimenti`, newMov)
      .subscribe(addMov => {
        const tmp = structuredClone(this._movimenti$.value);
        const index = this._movimenti$.value.findIndex(mov => mov.movimentoId === addMov.movimentoId);
        if(index!=-1){
          tmp.push(addMov);
        }
        else{
          tmp[index] = addMov;
        }
        this._movimenti$.next(tmp);
        this.fetch();
        this.contoSrv.single();
      },error => {
        this.alert.showAlert(error);
      });
  }

  aperturaConto()
  {
    this.http.post<Movimento>(`${enviroment.apiUrl}/api/movimenti/add-conto`, {})
      .subscribe(addMov => {
        const tmp = structuredClone(this._movimenti$.value);
        const index = this._movimenti$.value.findIndex(mov => mov.movimentoId === addMov.movimentoId);
        if(index!=-1){
          tmp.push(addMov);
        }
        else{
          tmp[index] = addMov;
        }
        this._movimenti$.next(tmp);
        this.fetch();
        this.contoSrv.single();
      },error => {
        this.alert.showAlert(error);
      });
  }
}