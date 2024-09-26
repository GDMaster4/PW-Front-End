import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RicaricaComponent } from './pages/ricarica/ricarica.component';
import { AddMovimentoComponent } from './pages/add-movimento/add-movimento.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { authGuard } from './guards/auth.guard';
import { ProfiloComponent } from './pages/profilo/profilo.component';
import { MovimentiComponent } from './pages/movimenti/movimenti.component';
import { movimentiFiltersResolver } from './resolvers/movimenti-filters.resolver';
import { MovimentiResolver } from './resolvers/movimenti.resolver';

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
    path: 'add-movimento',
    component:AddMovimentoComponent,    
    canActivate: [authGuard]
  },
  {
    path: 'movimenti/?numero',
    redirectTo:"movimenti",
    pathMatch:"prefix"
  },
  {
    path: 'movimenti',
    component:MovimentiComponent,   
    canActivate: [authGuard], 
    resolve:{
      filters:movimentiFiltersResolver,
      movimenti:MovimentiResolver
    },
    runGuardsAndResolvers:"paramsOrQueryParamsChange"
  },
  {
    path: 'confirm',
    component:ConfirmEmailComponent
  },
  {
    path: 'profilo',
    component:ProfiloComponent,    
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
