import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContoService } from '../../services/conto.service';
import { MovimentiFilters, MovimentiService } from '../../services/movimenti.service';
import { omitBy, isNil } from 'lodash';
import { ReplaySubject, Subject, takeUntil, map, debounceTime, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Movimento } from '../../entities/movimento.entity';
import { AuthService } from '../../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MovimentoDetailComponent } from '../../components/movimento-detail/movimento-detail.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit,OnDestroy
{
  protected updateQueryParams$ = new ReplaySubject<MovimentiFilters>();

  currentUser$ = this.authSrv.currentUser$;
  conto$= this.contoSrv.conto$;
  movimenti$= this.movSrv.movimenti$;
  protected destroyed$ = new Subject<void>();

  constructor(protected contoSrv:ContoService, protected movSrv:MovimentiService, protected router: Router,
    protected activatedRoute: ActivatedRoute, protected authSrv:AuthService,private modalService: NgbModal) {}

  ngOnInit(): void
  {
    this.conto$
      .pipe(
        takeUntil(this.destroyed$),
        debounceTime(150)
      )
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
  }

  applyFilters(value: MovimentiFilters) {
    this.updateQueryParams$.next(value);
  }

  openModal(movimento: Movimento)
  {
    const modalRef = this.modalService.open(MovimentoDetailComponent);
    modalRef.componentInstance.movimento = movimento; // Passiamo il movimento al modale
  }

  exportToCSV()
  {
    let data:any[]=[];
    this.movimenti$
      .subscribe(movimenti=>{
        data=movimenti.map(movimento => {
          return {
            contoCorrente:movimento.contoCorrente.iban,
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
            contoCorrente:movimento.contoCorrente.iban,
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