import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MovimentiFilters } from '../../services/movimenti.service';
import { Validators, FormBuilder } from '@angular/forms';
import { assign } from 'lodash';
import { Subject, takeUntil, filter } from 'rxjs';

@Component({
  selector: 'app-mov-filters',
  templateUrl: './mov-filters.component.html',
  styleUrl: './mov-filters.component.css'
})
export class MovFiltersComponent
{
  filtersForm = this.fb.group({
    categoria: ['', {updateOn: 'change'} ],
    firstData: ['', {updateOn: 'submit'} ],
    secondData: ['', {updateOn: 'submit'} ],
    numero: [5, { updateOn: 'submit', validators: [Validators.min(1)] }]
  });

  @Input()
  set filters(value: MovimentiFilters | null)
  {
    const defaultValue = {
      text: '',
      numero:99999,
      firstData:'',
      secondData:''
    }
    const tmp = assign(defaultValue, value);
    this.filtersForm.patchValue(tmp, {emitEvent: false});
    this.filtersForm.markAsPristine();
  }

  @Output()
  filterChange = new EventEmitter<MovimentiFilters>();

  protected destroyed$ = new Subject<void>();

  constructor(protected fb: FormBuilder){}

  ngOnInit(): void
  {
    this.filtersForm.valueChanges
      .pipe(
        takeUntil(this.destroyed$),
        filter(_ => this.filtersForm.valid)
      )
      .subscribe(value => {
        this.filterChange.emit({firstData: value.firstData!,secondData: value.secondData!, numero: value.numero!});
      });
  }

  ngOnDestroy(): void
  {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}