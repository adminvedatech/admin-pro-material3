import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpRequest, HttpClient } from '@angular/common/http';
import { Invoice } from 'src/app/customer/customer.model';
import { URL_SERVICIOS } from 'src/app/config/urls';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) { }

    // HttpEvent<{}>
    sendXmlSupplierInvoice(fileXml: File): Observable<any> {
      const formdata: FormData = new FormData();
      this.httpHeaders = new HttpHeaders({'Content-Type': 'application/xml'});
      formdata.append('file', fileXml);
      console.log('FORM DATA ', formdata);
      const req = new HttpRequest('POST', 'http://localhost:8080/api/invoice/supplier-xml-file', fileXml,  {
        headers: this.httpHeaders,
        reportProgress: true,
        // responseType: 'text'
      });
      // return this.http.request(req).pipe(
      //   tap(() =>  {
      //     this._refreshNeeded$.next();
      //   })
      // );
      return this.http.request(req);
    }


    getAllInvoiceSupplier(): Observable<Invoice[]> {
      console.log('GET ALL ACCOUNTS TYPE');
       this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        // url += '?token=' + this.token;
        return this.http.get<Invoice[]>(URL_SERVICIOS + '/api/supplier/getAllInvoiceSupplier', {headers: this.httpHeaders});
      }

}
