import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpEvent, HttpRequest, HttpHeaders, HttpClient } from '@angular/common/http';
import { Invoice, Customer } from '../customer.model';
import { URL_SERVICIOS } from 'src/app/config/urls';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) { }


  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    city: new FormControl(''),
    gender: new FormControl('1'),
    department: new FormControl(0),
    hireDate: new FormControl(''),
    isPermanent: new FormControl(false)
  });

  initializeFormGroup() {
    console.log('inicialize form');

    this.form.setValue({
      $key: null,
      fullName: '',
      email: '',
      mobile: '',
      city: '',
      gender: '3',
      department: 2,
      hireDate: '',
      isPermanent: true
    });
  }

   // HttpEvent<{}>
   sendXmlCustomerInvoice(fileXml: File): Observable<any> {
    const formdata: FormData = new FormData();
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/xml'});
    formdata.append('file', fileXml);
    console.log('FORM DATA ', formdata);
    const req = new HttpRequest('POST', 'http://localhost:8080/api/invoice/customer-xml-file', fileXml,  {
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

  getAllInvoiceCustomer(): Observable<Invoice[]> {
    console.log('GET ALL ACCOUNTS TYPE');

     this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
      // url += '?token=' + this.token;
      return this.http.get<Invoice[]>(URL_SERVICIOS + '/api/customer/getAllInvoiceCustomer', {headers: this.httpHeaders});

    }

    getAllCustomers(): Observable<Customer[]> {
      console.log('GET ALL ACCOUNTS TYPE');
       this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        // url += '?token=' + this.token;
        return this.http.get<Customer[]>(URL_SERVICIOS + '/api/customer/getAllCustomers', {headers: this.httpHeaders})
        // .pipe(
        //   tap(() =>  {
        //     this._refreshNeeded$.next();
        //   })
        //  );

      }

  getAllInvoiceByCustomer(id: any): Observable<Invoice[]> {
    console.log('GET ALL ACCOUNTS TYPE');
      this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
      // url += '?token=' + this.token;
      return this.http.post<Invoice[]>(URL_SERVICIOS + '/api/customer/getAllInvoiceByCustomer/' + id, {headers: this.httpHeaders});
    }

  createCustomer(object: Customer): Observable<Customer[]> {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
      // url += '?token=' + this.token;
      return this.http.post<Customer[]>(URL_SERVICIOS +
          '/api/customer/addCustomer', object, {headers: this.httpHeaders})
          // .pipe(
          // tap(() =>  {
          //   this._refreshNeeded$.next();
          // })
          // );
    }

}
