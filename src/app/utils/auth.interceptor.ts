import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { JwtService } from '../services/jwt.service';

/**
 * Classe che implementa HttpInterceptor per gestire correttamente le autenticazioni con il backend
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private jwtSrv: JwtService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Prende il token dal localStorage
    const authToken = this.jwtSrv.getToken();
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = authToken ? req.clone({
                                  headers: req.headers.set('Authorization', `Bearer ${authToken}`)
                                }) : req;
    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
