import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../../entities/user.entity';
import { UserIdentity } from '../../entities/useridentity.entity';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy{

  constructor(
    protected fb : FormBuilder,
    protected authSrv: AuthService,
    protected router: Router
  ) {}

  registerError = ''
  protected destroyed$ = new Subject<void>();

  ngOnInit(): void {
    this.registerForm.valueChanges
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(() => {
        this.registerError = '';
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    picture: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]]
  })

  async register(){
    let user: User = {
      firstName: this.registerForm.get("firstName")?.value || '',
      lastName: this.registerForm.get("lastName")?.value || '',
      picture: this.registerForm.get("picture")?.value || ''
    };

    let credentials: UserIdentity = {
      username: this.registerForm.get("email")?.value || '',
      password: this.registerForm.get("password")?.value || ''
    };
    const newUser = await this.authSrv.register(user, credentials);
  }
}
