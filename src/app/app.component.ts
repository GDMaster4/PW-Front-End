import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent
{
  currentUser$ = this.authSrv.currentUser$;

  constructor(protected authSrv: AuthService){ }

  logout(){
    this.authSrv.logout()
  } 
}
