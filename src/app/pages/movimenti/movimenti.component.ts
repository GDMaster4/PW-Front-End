import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovimentiFilters } from '../../services/movimenti.service';
import { debounceTime, map, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { omitBy, isNil } from 'lodash';

@Component({
  selector: 'app-movimenti',
  templateUrl: './movimenti.component.html',
  styleUrl: './movimenti.component.css'
})
export class MovimentiComponent implements OnInit,OnDestroy
{
  protected updateQueryParams$ = new ReplaySubject<MovimentiFilters>();
  protected destroyed$ = new Subject<void>();

  constructor(protected activatedRoute:ActivatedRoute, protected router:Router){}

  ngOnInit(): void
  {
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
    throw new Error('Method not implemented.');
  }
  
  applyFilters(value: MovimentiFilters) {
    this.updateQueryParams$.next(value);
  }
}