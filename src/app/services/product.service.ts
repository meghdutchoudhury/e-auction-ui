import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GetBidsResponse } from '../models/get-bids-response';
import { Product } from '../models/product';

const API_URL = 'https://fjbdbpr4f5.execute-api.us-east-1.amazonaws.com/prod/e-auction/api/v1';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(API_URL + '/seller/products/');
  }

  getBidsOnProduct(productId: string): Observable<GetBidsResponse> {
    return this.http
      .get<GetBidsResponse>(API_URL + '/seller/show-bids/' + productId);
  }
}
