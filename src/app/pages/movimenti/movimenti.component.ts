import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { omitBy, isNil } from 'lodash';
import { ReplaySubject, Subject, takeUntil, map, debounceTime } from 'rxjs';
import { MovimentiFilters, MovimentiService } from '../../services/movimenti.service';
import * as XLSX from 'xlsx';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-movimenti',
  templateUrl: './movimenti.component.html',
  styleUrl: './movimenti.component.css'
})
export class MovimentiComponent implements OnInit,OnDestroy
{
  protected updateQueryParams$ = new ReplaySubject<MovimentiFilters>();
  protected destroyed$ = new Subject<void>();
  movimenti$= this.movSrv.movimenti$;

  constructor(protected activatedRoute:ActivatedRoute, protected router:Router, protected movSrv:MovimentiService,
    protected authSrv:AuthService){}

  ngOnInit(): void
  {
    const url=this.router.url.split("?")[0];
    window.onbeforeunload = () => {
      this.updateQueryParams$.next({numero:99999});
      if (!this.authSrv.URL().includes(url)) {
        this.authSrv.logout();
      }
    };
    this.updateQueryParams$
        .pipe(
          takeUntil(this.destroyed$),
          map(filters => omitBy(filters, isNil)),
          map(filters => omitBy(filters, val => val === '')),
          debounceTime(150)
        )
        .subscribe(filters => {
          this.router.navigate([], {queryParams: filters});
        });
    this.activatedRoute.data.subscribe(data => console.log(data));    
  }
  
  ngOnDestroy(): void
  {
    this.destroyed$.next();
    this.destroyed$.complete();
    window.onbeforeunload = null; // Rimuove l'evento onbeforeunload
  }
  
  applyFilters(value: MovimentiFilters) {
    this.updateQueryParams$.next(value);
  }

  exportToCSV()
  {
    let data:any[]=[];
    this.movimenti$
      .subscribe(movimenti=>{
        data=movimenti.map(movimento => {
          return {
            IBAN:movimento.contoCorrente.iban,
            data:movimento.data,
            importo:movimento.importo,
            saldo:movimento.saldo,
            categoria:movimento.categoriaMovimento.nomeCategoria,
            descrizioneEstesa:movimento.descrizioneEstesa
          }
        });
      });
    const csvData = this.convertToCSV(data);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'movimenti.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  exportToExcel()
  {
    let data:any[]=[];
    this.movimenti$
      .subscribe(movimenti=>{
        data=movimenti.map(movimento => {
          return {
            IBAN:movimento.contoCorrente.iban,
            data:movimento.data,
            importo:movimento.importo,
            saldo:movimento.saldo,
            categoria:movimento.categoriaMovimento.nomeCategoria,
            descrizioneEstesa:movimento.descrizioneEstesa
          }
        });
      });
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Movimenti');
    XLSX.writeFile(workbook, 'movimenti.xlsx');
  }

  private convertToCSV(data: any[]): string
  {
    const keys = Object.keys(data[0]);
    const valuesArray = data.map(item => Object.values(item));
    const array = [keys, ...valuesArray];
    return array.map(row => {
      return Object.values(row).toString();
    }).join('\n');
  }
}