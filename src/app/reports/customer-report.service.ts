import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/urls';
import { SalesByProduct } from './models/reports.models';

@Injectable({
  providedIn: 'root'
})
export class CustomerReportService {
 
  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) { }

  getAllCustomers(): Observable<SalesByProduct[]> {
    console.log('GET ALL ACCOUNTS TYPE');
     this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
      // url += '?token=' + this.token;
      return this.http.get<SalesByProduct[]>(URL_SERVICIOS + '/api/reports/getSalesByProduct', {headers: this.httpHeaders})
      // .pipe(
      //   tap(() =>  {
      //     this._refreshNeeded$.next();
      //   })
      //  );

    }
}
