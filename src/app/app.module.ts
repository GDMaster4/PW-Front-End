import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MovimentoDetailComponent } from './components/movimento-detail/movimento-detail.component';
import { RicaricaComponent } from './pages/ricarica/ricarica.component';
import { AddMovimentoComponent } from './pages/add-movimento/add-movimento.component';
import { NavUserComponent } from './components/nav-user/nav-user.component';
import { AuthInterceptor } from './utils/auth.interceptor';
import { IfAuthenticatedDirective } from './directives/if-authenticated.directive';
import { DateAdapter, DateParserFormatter } from './utils/Datepicker-adapter';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { ProfiloComponent } from './pages/profilo/profilo.component';
import { ModPasswComponent } from './components/mod-passw/mod-passw.component';
import { MovFiltersComponent } from './components/mov-filters/mov-filters.component';
import { MovimentiComponent } from './pages/movimenti/movimenti.component';
import { MovimentiService } from './services/movimenti.service';
import { ContoService } from './services/conto.service';
import { SingleMovComponent } from './components/single-mov/single-mov.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    RegisterComponent,
    LoginComponent,
    MovimentoDetailComponent,
    RicaricaComponent,
    AddMovimentoComponent,
    NavUserComponent,
    IfAuthenticatedDirective,
    ConfirmEmailComponent,
    ProfiloComponent,
    ModPasswComponent,
    MovFiltersComponent,
    MovimentiComponent,
    SingleMovComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: NgbDateAdapter,
      useClass: DateAdapter
    },
    {
      provide: NgbDateParserFormatter,
      useClass: DateParserFormatter
    },
    {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
    AuthService,
    MovimentiService,
    ContoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
