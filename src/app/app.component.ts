import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BankingApp';
  constructor(private authsrv: AuthService){

  }
  logout(){
    this.authsrv.logout()
  } 
}
