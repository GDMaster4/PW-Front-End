import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { catchError, interval, Subject, Subscription, take, takeUntil, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy
{
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  loginError = '';
  countdown: number = 30;  // Numero di secondi del countdown
  private countdownSubscription!: Subscription;


  protected destroyed$ = new Subject<void>();

  constructor( protected fb: FormBuilder, protected authSrv: AuthService, protected router: Router)
  {
    this.authSrv.currentUser$
      .subscribe(user => {
        if (user) {
          this.router.navigate(['/home']);
        }
      })
  }

  ngOnInit()
  {
    this.loginForm.valueChanges
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(() => {
        this.loginError = '';
      });
    this.countdownSubscription = interval(1000)
      .pipe(take(this.countdown))  // Limita l'intervallo alla durata del countdown
      .subscribe({
        next: (value) =>{ this.countdown -= 1;console.log(this.countdown);},
        complete: () => this.redirect()
      });
  }

  ngOnDestroy()
  {
    this.destroyed$.next();
    this.destroyed$.complete();    
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }
  
  redirect()
  {
    this.loginForm.reset();
    this.countdownSubscription.unsubscribe();
  }

  /**
   * Method checking if login form is balid and calls for authservice to validate login parameters,
   * then navigates to /percorsi if ok
   */
  login()
  {
    if (this.loginForm.valid)
    {
      const { username, password } = this.loginForm.value;
      this.authSrv.login(username!, password!)
       .pipe(
          catchError(err=>{
            this.loginError=err.error.message;
            return throwError(()=>err);
          })
        )
        .subscribe(user=>{
          this.authSrv.fetchUser();
          this.router.navigate(['/home']);
        })
    }
  }
}