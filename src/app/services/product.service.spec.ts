import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(ProductService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should invoke get products endpoint', () => {
    spyOn(http, 'get').and.returnValue(of('success'))
    service.getProducts()
    expect(http.get).toHaveBeenCalled()
  });

  it('should handle errors on get products endpoint', () => {
    spyOn(http, 'get').and.throwError('service failure')
    expect(() => service.getProducts()).toThrowError()
    expect(http.get).toHaveBeenCalled()
  });

  it('should handle errors on get bids endpoint', () => {
    spyOn(http, 'get').and.throwError('service failure')
    expect(() => service.getBidsOnProduct('123')).toThrowError()
    expect(http.get).toHaveBeenCalled()
  });

});
