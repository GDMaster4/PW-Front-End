import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';

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

  protected destroyed$ = new Subject<void>();

  constructor( protected fb: FormBuilder, protected authSrv: AuthService, protected router: Router) {}

  ngOnInit()
  {
    this.loginForm.valueChanges
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(() => {
        this.loginError = '';
      });
  }

  ngOnDestroy()
  {
    this.destroyed$.next();
    this.destroyed$.complete();
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
          catchError(err => {
            this.loginError = err.error.message;
            alert("Username o password errati")
            return throwError(() => err);
          })
        )
        .subscribe(user => {
          this.router.navigate(['/todo']);
        })
    }
  }
}