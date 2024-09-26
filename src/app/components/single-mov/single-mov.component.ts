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
export class SingleMovComponent
{
  @Input()
  movimento:Movimento | null=null;

  constructor(protected modalService: NgbModal) {}

  openModal(movimento: Movimento)
  {
    const modalRef = this.modalService.open(MovimentoDetailComponent);
    modalRef.componentInstance.movimento = movimento; // Passiamo il movimento al modale
  }
}