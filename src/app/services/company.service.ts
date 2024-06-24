import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, map  } from 'rxjs';
import { SimpleResultCompany } from '../Model/SimpleResultCompany';
import { environment } from '../../environments/environment';
import { SimpleResultEditables } from '../Model/SimpleResultEditables';
import { Departamento, SimpleResultDepartamentos } from '../Model/SimpleResultDepartamentos';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  getCompanyService(): Observable<any>{
    return this.http.get<SimpleResultCompany>(environment.urlApiCompany).pipe(
      catchError(this.handleError));
  }

  getEditablesService(): Observable<any>{
    return this.http.get<SimpleResultEditables>(environment.urlApiEditables).pipe(
      catchError(this.handleError));
  }

  getDepartamentos(): Observable<SimpleResultDepartamentos>{
    return this.http.get<any>(environment.urlApiDepartamentos).pipe(
      map(data => {
        const departamentos = data.departamentos.map((dept: any) => new Departamento(dept.nombre, dept.municipios));
        return new SimpleResultDepartamentos(departamentos);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error("Error en el servicio ontener company:", error);
    return throwError('Algo salió mal; por favor, inténtelo de nuevo más tarde.');
  }
}
