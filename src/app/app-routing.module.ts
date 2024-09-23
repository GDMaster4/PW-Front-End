import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RicaricaComponent } from './pages/ricarica/ricarica.component';
import { BonificoComponent } from './pages/bonifico/bonifico.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component:HomepageComponent,    
    canActivate: [authGuard],
  },
  {
    path: 'ricarica',
    component:RicaricaComponent,    
    canActivate: [authGuard]
  },
  {
    path: 'bonifico',
    component:BonificoComponent,    
    canActivate: [authGuard]
  },
  {
    path: 'confirm',
    component:ConfirmEmailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
