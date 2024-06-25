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
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  private loggedIn = false;
  usuario: string = "";

  constructor(private http: HttpClient) {}

  login1(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  login(credentials: LoginRequest): Observable<SimpleResult> {
    console.log("json: ", credentials);
    return this.http.post<SimpleResult>(environment.urlApiLogin + 'login', credentials)
      .pipe(
        tap((result: SimpleResult) => {
          if (result.estado === 'activo') {
            this.loggedIn = true;
            if (this.isLocalStorageAvailable()) {
              localStorage.setItem('usuario', result.username);
            }
          }
        }),
        catchError(this.handleError)
      );
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }


  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  private handleError(error: HttpErrorResponse) {
    console.error("error service: ", error);  // Manejo de errores más detallado
    return throwError('Something went wrong; please try again later.');
  }
}
