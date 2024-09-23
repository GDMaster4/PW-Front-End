import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { JwtService } from './jwt.service';
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
   * @param email
   * @param password
   * @returns JWT token to be stored in localstorage
   */
  login(email: string, password: string)
  {
    console.log(email,password);
    return this.http.post<{user: User, token: string}>("/api/login", {email, password})
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
   */
  register(userData: User): void
  {
    this.http.post<User>("/api/register", userData)
      .subscribe(user=>{
            this._currentUser$.next(user);
            //this.router.navigate(['/login'])
            // Perform additional actions like redirecting the user or storing the token
          },
          error=> {
            // Handling errori
            console.error(error);
          }
      );
  }
}