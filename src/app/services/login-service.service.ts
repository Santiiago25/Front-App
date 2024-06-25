import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginRequest } from './loginRequest';
import { SimpleResult } from '../Model/SimpleResult';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<SimpleResult> {
    console.log("json: ", credentials);
    return this.http.post<SimpleResult>(environment.urlApiLogin + 'log-in', credentials)
      .pipe(
        tap((result: SimpleResult) => {
          if (result.estado === 'activo') {
            localStorage.setItem('authToken', result.jwt);
            localStorage.setItem('usuario', result.username);
          }
        }),
        catchError(this.handleError)
      );
  }

  isLoggedIn(): boolean {
    if (this.isBrowser()) {
      return !!localStorage.getItem('authToken');
    }
    return false;
  }

  logout() {
    if (this.isBrowser()) {
      localStorage.clear();
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private handleError(error: HttpErrorResponse) {
    console.error("error service: ", error);  // Manejo de errores más detallado
    return throwError('Something went wrong; please try again later.');
  }
}
