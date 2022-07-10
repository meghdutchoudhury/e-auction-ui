import { TestBed } from '@angular/core/testing';

import { TokenStorageService } from './token-storage.service';

const TOKEN_KEY = 'auth-token';

describe('TokenStorageService', () => {
  let service: TokenStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save new token', () => {
    window.sessionStorage.setItem(TOKEN_KEY, '123')
    service.saveToken('456')
    expect(window.sessionStorage.getItem(TOKEN_KEY)).toBe('456')
  });

  it('should get token', () => {
    window.sessionStorage.setItem(TOKEN_KEY, '123')
    expect(service.getToken()).toBe('123')
  });

});
