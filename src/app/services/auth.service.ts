import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { JwtService } from './jwt.service';
import { UserIdentity } from '../entities/useridentity.entity';
import { User } from '../entities/user.entity';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  private _currentUser$ = new BehaviorSubject<User | null>(null);

  currentUser$ = this._currentUser$.asObservable();

  constructor(
    protected http: HttpClient,
    protected jwt: JwtService,
    protected router: Router
  ) {}


  /**
   * Method used to check if user has valid token and is not expired
   * @returns boolean value
   */
  isLoggedIn()
  {
    if(this.jwt.hasToken())
    {
      let token = localStorage.getItem('authToken');
      const payload = JSON.parse(atob(token!.split('.')[1]));
      const isExpired = payload.exp < Date.now() / 1000;

      if(isExpired){
        this.logout();
        return false;
      }

      return true;
    }
    else{
      return false;
    }
  }

  /**
   * Method used to send username and password to API and returns token if valid
   * @param username
   * @param password
   * @returns JWT token to be stored in localstorage
   */
  login(username: string, password: string)
  {
    return this.http.post<{user: User, token: string}>("/api/user/login", {username, password})
      .pipe(
        tap(res => this.jwt.setToken(res.token)),
        tap(res => this._currentUser$.next(res.user)),
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
   * @param userCredentials User credentials
   */
  register(userData: User, userCredentials: UserIdentity): void
  {
    const headers = new HttpHeaders().set('Content-type', 'application/json; charset=utf-8');
    const payload = JSON.stringify({
      "firstName" : userData.firstName,
      "lastName": userData.lastName,
      "username": userCredentials.username,
      "password": userCredentials.password
    })

    this.http.post<User>("/api/user/register", payload, {headers: headers})
      .subscribe(
        {
          next: (response: User) => {
            this._currentUser$.next(response);
            this.router.navigate(['/login'])
            // Perform additional actions like redirecting the user or storing the token
          },
          error: (err) => {
            // Handling errori
            if (err.status === 400 && err.error.message || err.error.error) {
              if(err.error.error && err.error.message){
                return alert("Attenzione: " + err.error.message);
              }
              else if(err.error.error){
                return alert("Attenzione: " + err.error.error)
              }
              return alert("Errore generico")
            }
            else if (err.status === 500) {
              return alert("Server Error: Please try again later.");
            } else {
              return alert("Error: " + err.message);
            }
          }
        }
      );
  }
}