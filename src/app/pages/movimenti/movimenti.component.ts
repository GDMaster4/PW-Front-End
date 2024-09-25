import { Component } from '@angular/core';
import { MovimentiFilters } from '../../services/movimenti.service';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-movimenti',
  templateUrl: './movimenti.component.html',
  styleUrl: './movimenti.component.css'
})
export class MovimentiComponent
{
  protected updateQueryParams$ = new ReplaySubject<MovimentiFilters>();

  
  applyFilters(value: MovimentiFilters) {
    this.updateQueryParams$.next(value);
  }
}