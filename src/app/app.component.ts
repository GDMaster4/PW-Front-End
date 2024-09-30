import { Component, ViewChild } from '@angular/core';
import { Route } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AlertComponent } from './components/alert/alert.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent
{
  title = "Banking App";
  currentUser$ = this.authSrv.currentUser$;

  constructor(protected authSrv: AuthService){ }

  logout(){
    this.authSrv.logout()
  }

  
}
