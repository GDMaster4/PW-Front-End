import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ContoService } from '../../services/conto.service';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.css'
})
export class ProfiloComponent
{
  currentUser$= this.authSrv.currentUser$;
  currentConto$=this.contSrv.conto$;

  constructor(protected authSrv:AuthService,protected contSrv:ContoService){}

}