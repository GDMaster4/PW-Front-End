import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../../entities/user.entity';
import { AlertComponent } from '../../components/alert/alert.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy
{
  registerForm = this.fb.group({
    nomeTitolare: ['', Validators.required],
    cognomeTitolare: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    Conferma: ['', Validators.required]
  })

  registerError = ''
  errConferma:string="";
  protected destroyed$ = new Subject<void>();

  constructor( protected fb : FormBuilder, protected authSrv: AuthService, protected router: Router) {}

  ngOnInit(): void
  {
    this.registerForm.valueChanges
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(() => {
        this.registerError = '';
      });
  }

  ngOnDestroy(): void
  {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  async register()
  {
    const user: User = {
      nomeTitolare: this.registerForm.get("nomeTitolare")?.value || '',
      cognomeTitolare: this.registerForm.get("cognomeTitolare")?.value || '',
      email: this.registerForm.get("email")?.value || '',
      password: this.registerForm.get("password")?.value || ''
    };

    await this.authSrv.register(user);
    this.registerForm.reset();
    this.alertComponent.showAlert("CONTROLLA LA TUA EMAIL");
  }

  controlloTesto()
  {
    const nuovaPassw = this.registerForm.getRawValue().password;
    const conferma = this.registerForm.getRawValue().Conferma;
    if(nuovaPassw != conferma) {
      this.errConferma="La password non è uguale";
    }
    else {
      this.errConferma="";
    }
  }

  @ViewChild(AlertComponent) alertComponent!: AlertComponent;

  triggerAlert(msg:string) {
    this.alertComponent.showAlert(msg);
  }
}