import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private tokenStorageService: TokenStorageService, public router: Router) { }
  
  canActivate(): boolean {
    var isLoggedIn = !!this.tokenStorageService.getToken()
    if (!isLoggedIn) {
      this.router.navigate(['login'])
      return false
    }
    return true
  }
}