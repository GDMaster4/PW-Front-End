import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { MovimentiDetailComponent } from './components/movimenti-detail/movimenti-detail.component';
import { MovimentiComponent } from './pages/movimenti/movimenti.component';
import { RicaricaComponent } from './pages/ricarica/ricarica.component';
import { BonificoComponent } from './pages/bonifico/bonifico.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    RegisterComponent,
    LoginComponent,
    MovimentiDetailComponent,
    MovimentiComponent,
    RicaricaComponent,
    BonificoComponent
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
    AuthService,
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
