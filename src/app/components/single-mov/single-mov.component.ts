import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Movimento } from '../../entities/movimento.entity';
import { MovimentoDetailComponent } from '../movimento-detail/movimento-detail.component';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-mov',
  templateUrl: './single-mov.component.html',
  styleUrl: './single-mov.component.css'
})
export class SingleMovComponent implements OnInit,OnDestroy
{
  @Input()
  movimento:Movimento | null=null;
  
  protected destroyed$ = new Subject<void>();

  constructor(protected activatedRoute: ActivatedRoute,protected modalService: NgbModal) {}

  ngOnInit(): void
  {
    this.activatedRoute.data.subscribe(data => console.log(data));    
  }

  ngOnDestroy(): void
  {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  openModal(movimento: Movimento)
  {
    const modalRef = this.modalService.open(MovimentoDetailComponent);
    modalRef.componentInstance.movimento = movimento; // Passiamo il movimento al modale
  }
}