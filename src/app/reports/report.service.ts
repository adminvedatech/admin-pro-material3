import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SalesByProduct, FormDate } from './models/reports.models';
import { Observable } from 'rxjs';
import { URL_SERVICIOS } from '../config/urls';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) { }

  getSalesByProduct(data): Observable<SalesByProduct[]> {
    console.log('GET ALL ACCOUNTS TYPE');
     this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
      // url += '?token=' + this.token;
      return this.http.post<SalesByProduct[]>(URL_SERVICIOS + '/api/reports/getSalesByProduct', data, { headers: this.httpHeaders})
      // .pipe(
      //   tap(() =>  {
      //     this._refreshNeeded$.next();
      //   })
      //  );

    }
}
