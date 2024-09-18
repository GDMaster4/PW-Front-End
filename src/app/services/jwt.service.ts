import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {


  /**
   * Metodo che setta il token nel localStorage
   * @param string JWT Token
   */
  setToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  /**
   * Metodo utilizzato per recuperare il token dal localStorage
   * @returns JWT Token
   */
  getToken() {
    return localStorage.getItem('authToken');
  }

  /**
   * Metodo per controllare se c'è il token
   * @returns boolean - true se esiste, false se non esiste
   */
  hasToken() {
    return !!this.getToken();
  }

  /**
   * Metodo che rimuove il token dal localstorage
   */
  removeToken() {
    localStorage.removeItem('authToken');
  }

  /**
   * Metodo per decodificare il token da base64 a json
   * @param token
   * @returns Versione JSON del token
   */
  decodeToken(token: string): any {
    return JSON.parse(atob(token.split('.')[1]));
  }

  /**
   * Metodo usato per controllare la data di scadenza del token
   * @param token come string
   * @returns null se il token decodificato non ha una data di scadenza
   * @returns data di scadenza in millisecondi
   */
  getTokenExpirationDate(token: string): Date | null {
    const decodedToken = this.decodeToken(token);
    if (!decodedToken.exp) {
      return null;
    }
    // Converte la data di scadenza in millisecondi
    const date = new Date(0);
    date.setUTCSeconds(decodedToken.exp);
    return date;
  }

  /**
   * Metodo utilizzato per controllare il tempo rimanente della validità del token
   * @param token
   * @returns tempo rimanente del token
   */
  getRemainingTime(token: string): number{
    const expirationDate = this.getTokenExpirationDate(token);
    if (!expirationDate) {
      return 0;
    }
    return expirationDate.getTime() - Date.now();
  }
}
