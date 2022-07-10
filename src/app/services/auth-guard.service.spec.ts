import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../components/login/login.component';

import { AuthGuardService } from './auth-guard.service';
import { TokenStorageService } from './token-storage.service';

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  let tokenStorageService: TokenStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        { path: 'login', component: LoginComponent }
      ])],
      providers: [AuthGuardService, TokenStorageService]
    });
    service = TestBed.inject(AuthGuardService);
    tokenStorageService = TestBed.inject(TokenStorageService);
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should pass-through to restricted pages if logged in', () => {
    spyOn(tokenStorageService, 'getToken').and.returnValue('123')
    expect(service.canActivate()).toBeTrue()
  });

  it('should guard restricted pages if not logged in', () => {
    spyOn(tokenStorageService, 'getToken').and.returnValue(null)
    expect(service.canActivate()).toBeFalse()
  });

});
