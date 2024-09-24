import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.css'
})
export class ProfiloComponent
{
  currentUser$= this.authSrv.currentUser$;

  constructor(protected authSrv:AuthService){}

}