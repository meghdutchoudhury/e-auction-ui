import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const COGNITO_TOKEN_URL = 'https://e-auction.auth.us-east-1.amazoncognito.com/oauth2/token?grant_type=client_credentials&scope=default/default';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(username + ':' + password)
       }),
    };
    
    return this.http.post(COGNITO_TOKEN_URL, null, httpOptions);
    
  }
  
}