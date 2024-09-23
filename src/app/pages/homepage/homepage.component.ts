import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContoService } from '../../services/conto.service';
import { MovimentiFilters, MovimentiService } from '../../services/movimenti.service';
import { omitBy, isNil } from 'lodash';
import { ReplaySubject, Subject, takeUntil, map, debounceTime, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Movimento } from '../../entities/movimento.entity';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit,OnDestroy
{
  protected updateQueryParams$ = new ReplaySubject<MovimentiFilters>();

  conto$= this.contoSrv.conto$;
  movimenti$= new Observable<Movimento[]>;
  protected destroyed$ = new Subject<void>();

  constructor(protected contoSrv:ContoService, protected movSrv:MovimentiService, protected router: Router,
    protected activatedRoute: ActivatedRoute,) {}

  ngOnInit(): void
  {
    this.conto$
      .pipe(
        takeUntil(this.destroyed$),
        debounceTime(150)
      )
      .subscribe ( conto=>{
        this.movSrv.fetch(conto!.contoCorrenteID);
        this.movimenti$=this.movSrv.movimenti$;
      })
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
}