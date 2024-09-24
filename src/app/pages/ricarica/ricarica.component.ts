import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovimentiService } from '../../services/movimenti.service';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-ricarica',
  templateUrl: './ricarica.component.html',
  styleUrl: './ricarica.component.css'
})
export class RicaricaComponent
{
  ricaricaForm = this.fb.group({
    NumCell: ['', Validators.required, Validators.maxLength(10)],
    Conferma: ['', Validators.required, Validators.maxLength(10)],
    importo:[0,Validators.required],
    operatore: ['', Validators.required]
  });
  errCell:string="";
  operatori=["Iliad","Vodafone","Tim","Fastweb","WindTre","Coop Mobile","Very Mobile","Altro"];

  constructor( protected fb: FormBuilder, protected movSrv: MovimentiService, protected router: Router) {}

  controlloTesto()
  {
    const numCell = this.ricaricaForm.getRawValue().NumCell;
    const conferma = this.ricaricaForm.getRawValue().Conferma;
    if(numCell != conferma) {
      this.errCell="Il numero di cellulare non è uguale";
    }
    else {
      this.errCell="";
    }
  }

  ricarica()
  {
    if(this.ricaricaForm.valid)
    {
      const {importo,NumCell}= this.ricaricaForm.value;
      this.movSrv.add(importo!,`ricarica del numero ${NumCell}`,"Ricarica");
      this.ricaricaForm.reset();
      this.router.navigate(['/home']);
    }
  }
}