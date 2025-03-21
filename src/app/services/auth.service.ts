import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { JwtService } from './jwt.service';
import { User } from '../entities/user.entity';
import { AlertComponent } from '../components/alert/alert.component';
import { enviroment } from '../../../collegamento';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  private _currentUser$ = new BehaviorSubject<User | null>(null);
  currentUser$ = this._currentUser$.asObservable();
  @ViewChild(AlertComponent) alertComponent!: AlertComponent;

  triggerAlert(msg:string) {
    this.alertComponent.showAlert(msg);
  }

  constructor( protected http: HttpClient,  protected jwt: JwtService, protected router: Router) {
    this.fetchUser();
  }

  /**
   * Method used to check if user has valid token and is not expired
   * @returns boolean value
   */
  isLoggedIn() {
    return this.jwt.hasToken();
  }

  /**
   * Method used to send username and password to API and returns token if valid
   * @param email
   * @param password
   * @returns JWT token to be stored in localstorage
   */
  login(email: string, password: string)
  {
    return this.http.post<{user: User, token: string}>(`${enviroment.apiUrl}/api/login`, {email, password})
      .pipe(
        tap(res => this.jwt.setToken(res.token)),
        map(res => res.user)
      );
  }

  /**
   * Method used to remove token from localstorage and reroute to login page
   */
  logout()
  {
    this.jwt.removeToken();
    this._currentUser$.next(null);
    this.router.navigate(['/login']);
  }

  /**
   *
   * @param userData User object
   */
  register(userData: User): void
  {
    this.http.post<User>(`${enviroment.apiUrl}/api/register`, userData)
      .subscribe(user=>{},
          error=> {
            // Handling errori
            this.triggerAlert(error);
          }
      );
  }

  fetchUser()
  {
    this.http.get<User>(`${enviroment.apiUrl}/api/user/me`)
      .subscribe(user=>this._currentUser$.next(user));
  }

  fetchUsers()
  {
    const utenti=this.http.get<User[]>(`${enviroment.apiUrl}/api/user`)
      .pipe(
        map(users => users.filter(user => user.id !== this._currentUser$.value?.id))
      );
    return utenti;    
  }

  modPassw(nuovaPassw:string)
  {
    this.http.patch<User>(`${enviroment.apiUrl}api/user`,{nuovaPassw:nuovaPassw})
      .subscribe(updated => {
        let tmp = structuredClone(this._currentUser$.value);
        tmp = updated;
        this._currentUser$.next(tmp);
        this.fetchUser();
      },error => {
        this.triggerAlert(error);
      }); 
  }

  URL() {
    return ["/ricarica","/home","/add-movimento","/movimenti","/profilo"];
  }
}