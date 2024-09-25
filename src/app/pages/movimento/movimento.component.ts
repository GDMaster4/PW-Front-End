import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ContoService } from '../../services/conto.service';
import { MovimentiService } from '../../services/movimenti.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movimento',
  templateUrl: './movimento.component.html',
  styleUrl: './movimento.component.css'
})
export class MovimentoComponent
{
  movForm=this.fb.group({
    iban:[''],
    importo:[0,Validators.required],
    casuale:['',Validators.required],
    categoria:['',Validators.required],
    nome:[''],
    cognome:[''],
  });
  conti$= this.contoSrv.list();
  ibans:string[]=[];
  private destroyed$= new Subject<void>();  
	closeResult = '';
  bonifico:boolean=false;
  
  constructor(protected fb: FormBuilder, protected contoSrv:ContoService, protected movSrv:MovimentiService,
    protected router:Router
  ) { }

  ngOnInit()
  {
    this.conti$
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(conti=>{
        this.ibans=conti.map(conto => conto.iban);
      })
    this.movForm.valueChanges
      .pipe(
        takeUntil(this.destroyed$)
      );
  }
  
  ngOnDestroy(): void
  {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  
  selezione()
  {
    if(this.movForm.getRawValue().categoria=="Bonifico") {
      this.bonifico=true;
    }
    else {
      this.bonifico=false;
    }
  }

  Movimento()
  {
    if(this.movForm.valid)
    {
      const {iban,importo,casuale,categoria}=this.movForm.value!;
      if(iban !== undefined)
      {
        if(this.ibans.includes(iban!)) {
          this.movSrv.add(importo!,categoria!,casuale!,iban!);
          this.router.navigate(['/home']);
        }
        else {
          return;
        }
      }
      else {
        this.movSrv.add(importo!,categoria!,casuale!);
        this.router.navigate(['/home']);
      }
    }
  }
}