import { Injectable } from '@angular/core';
import { tap, map, share, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { LoginData } from '../models/logindata';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private decoder: JwtHelperService) { 
    this.decoder = new JwtHelperService();
  }

  //fonction de connexion. 
  logIn(login: string, password: string): Observable<string>{
    const url = this.apiUrl + "/auth/login";
    return this.http.post<LoginData>(url, {
      email: login,
      password: password
    })
    .pipe(
      map( res => {
        localStorage.setItem("access_token", res.access_token);
        localStorage.setItem("refresh_token", res.refresh_token);
        return 'success';
      }),
      catchError((error: any): Observable<any> => {
          return of('Error');
        }
      )
    )
  }

  //tentative de fonction qui rafraîchit le token.
  refreshToken(): Observable<string> {
    const url = this.apiUrl + "/auth/refresh";
  
    
    const refreshToken = localStorage.getItem('refreshToken');
    const expiredToken = localStorage.getItem('token');
  
    return this.http
      .get(url, {
        headers: new HttpHeaders()
          .set('refreshToken', refreshToken)
          .set('token', expiredToken),
        observe: 'response'
      })
      .pipe(
        share(),
        map(res => {
          const token = res.headers.get('token');
          const newRefreshToken = res.headers.get('refreshToken');
          localStorage.setItem('refresh_token', newRefreshToken);
          localStorage.setItem('access_token', token);
          return token;
       })
    );
  }

  public getToken(): Observable<string> {
    const token = localStorage.getItem('token');
    const isTokenExpired = this.decoder.isTokenExpired(token);
  
    if (!isTokenExpired) {
        return of(token);
    }
  
    return this.refreshToken();
  }
}
