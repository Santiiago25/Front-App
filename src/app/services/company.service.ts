import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { SimpleResultCompany } from '../Model/SimpleResultCompany';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  getCompanyService(): Observable<any>{
    return this.http.get<SimpleResultCompany>(environment.urlApiCompany).pipe(
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error("Error en el servicio ontener company:", error);
    return throwError('Algo salió mal; por favor, inténtelo de nuevo más tarde.');
  }
}
