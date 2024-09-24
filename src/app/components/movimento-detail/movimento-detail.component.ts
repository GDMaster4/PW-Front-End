import { Component, Input, TemplateRef } from '@angular/core';
import { Movimento } from '../../entities/movimento.entity';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-movimenti-detail',
  templateUrl: './movimento-detail.component.html',
  styleUrls: ['./movimento-detail.component.css']
})
export class MovimentoDetailComponent
{
  @Input()
  movimento:Movimento | null=null;

	closeResult = '';
  constructor(protected modal: NgbModal, protected fb: FormBuilder){}

  open(content: TemplateRef<any>)
  {
    this.modal.open(content, { ariaLabelledBy: 'modal-basic-title' })
    .result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;       
      },
    );
  }

	private getDismissReason(reason: any): string
  {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}
}