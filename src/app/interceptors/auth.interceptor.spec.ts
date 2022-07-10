import { HttpHandler, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {

  let tokenStorageService: TokenStorageService;
  let interceptor: AuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthInterceptor,
        TokenStorageService
      ]
    })
    interceptor = TestBed.inject(AuthInterceptor);
    tokenStorageService = TestBed.inject(TokenStorageService);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should trigger interceptor handler', () => {

    const next: any = {
      handle: () => {
        return of((subscriber: { complete: () => void; }) => {
          subscriber.complete();
        });
      }
    };

    const requestMock = new HttpRequest('GET', '/test');
    interceptor.intercept(requestMock, next).subscribe(() => {
      expect(requestMock.clone).toHaveBeenCalled()
    });

  });

});
