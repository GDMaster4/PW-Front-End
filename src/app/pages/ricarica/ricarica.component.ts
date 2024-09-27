import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovimentiService } from '../../services/movimenti.service';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-ricarica',
  templateUrl: './ricarica.component.html',
  styleUrl: './ricarica.component.css'
})
export class RicaricaComponent implements OnInit,OnDestroy
{
  ricaricaForm = this.fb.group({
    NumCell: ['', Validators.required],
    Conferma: ['', Validators.required],
    importo:[0,Validators.required],
    operatore: ['', Validators.required]
  });
  errCell:string="";
  operatori=["Iliad","Vodafone","Tim","Fastweb","Windtre","CoopVoce","VeryMobile","Altro"];

  constructor( protected fb: FormBuilder, protected movSrv: MovimentiService, protected router: Router,
    protected authSrv:AuthService) {}

  ngOnInit()
  {
    window.onbeforeunload = () => {
      this.authSrv.logout();
    };
  }
  
  ngOnDestroy() {
    window.onbeforeunload = null; // Rimuove l'evento onbeforeunload
  }

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
      const {importo,NumCell}= this.ricaricaForm.value!;
      this.movSrv.add(importo!,"Ricarica",`ricarica del numero ${NumCell}`);
      this.ricaricaForm.reset();
      this.router.navigate(['/home']);
    }
  }
}