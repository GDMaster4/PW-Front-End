import { Component, inject, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Movimento } from '../../entities/movimento.entity';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-movimenti-detail',
  templateUrl: './movimento-detail.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./movimento-detail.component.css']
})
export class MovimentiDetailComponent
{
  constructor(private modalSrv : NgbModal){}

//todo: da togliere movimentoMock e scommentare input quando abbiamo chiamata ad API
//  @Input() detail: Movimento;
  movimentoMock : Movimento = {
    IdMovimento: '123ujhv923',
    IdCC: '13123123ccc',
    Descrizione: 'Test gesù bambino',
    DataMovimento: new Date('2024-09-01T00:00:00'),
    Importo: -123.45,
    Categoria: {
      IdTipoMov: '112233aa',
      Nome: 'Bonifico Ordinario',
      Tipologia: 'USCITA'
    }
  }

  //*Chiamata per aprire il modale con i dettagli del movimento
  openDetailCard(content: TemplateRef<any>){
    this.modalSrv.open(content);
  }
}