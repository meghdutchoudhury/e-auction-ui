import { Injectable } from '@angular/core';
const TOKEN_KEY = 'auth-token';
const TOKEN_KEY_EXPIRATION = 'auth-token-expiration';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    var expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 3600 * 1000);
    window.sessionStorage.setItem(TOKEN_KEY_EXPIRATION, expirationDate.getTime().toString());
  }

  public getToken(): string | null {
    var expirationTime = window.sessionStorage.getItem(TOKEN_KEY_EXPIRATION);
    console.log(expirationTime);
    if(expirationTime && parseInt(expirationTime) < new Date().getTime()) {
      return null;
    }
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
}