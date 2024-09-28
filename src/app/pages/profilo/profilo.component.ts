import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ContoService } from '../../services/conto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.css'
})
export class ProfiloComponent implements OnInit,OnDestroy
{
  currentUser$= this.authSrv.currentUser$;
  currentConto$=this.contSrv.conto$;

  constructor(protected authSrv:AuthService,protected contSrv:ContoService, protected router:Router){}

  ngOnInit()
  {
    window.onbeforeunload = () => {
      if (!this.authSrv.URL().includes(this.router.url)) {
        this.authSrv.logout();
      }
    };
  }

  ngOnDestroy() {
    window.onbeforeunload = null; // Rimuove l'evento onbeforeunload
  }
}