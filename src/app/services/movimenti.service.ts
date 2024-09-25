import { Injectable } from '@angular/core';
import { Movimento } from '../entities/movimento.entity';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { isNil, omitBy } from 'lodash';
import { ContoService } from './conto.service';

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
    this.http.get<Movimento[]>(`/api/movimenti/${this.conto}?numero=5`)
      .subscribe(movimenti=>{
        this._movimenti$.next(movimenti);
      });
  }

  list(filters:MovimentiFilters)
  {
    let q=omitBy(filters,isNil);
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

    this.http.post<Movimento>("/api/movimenti/", newMov)
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
        console.error(error);
      });
  }
}