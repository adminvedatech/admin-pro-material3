import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpEvent, HttpHeaders, HttpRequest, HttpClient } from '@angular/common/http';
import { AccountType, SubAccount } from '../account.model';
import { URL_SERVICIOS } from 'src/app/config/urls';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private httpHeaders = new HttpHeaders();
  private urlEndUpdate = URL_SERVICIOS + '/api/account/getSubAccounts';
  private urlEndUpdate2 = URL_SERVICIOS + '/api/account/getAccountTypeById';


  constructor(private http: HttpClient) { }
  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }


      // .pipe( map(response => response as AccountType[]))
    // Otra opcion para mandar file
    pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
      const formdata: FormData = new FormData();
      this.httpHeaders = new HttpHeaders({'Accept': 'application/json'});
      formdata.append('file', file);
      console.log('FORM DATA ', formdata);

      const req = new HttpRequest('POST', 'http://localhost:8080/api/upload/accounting-type-file', formdata,  {
        headers: this.httpHeaders,
        reportProgress: true,
        responseType: 'text'
      });
      return this.http.request(req);
      /* .pipe(
        tap(() =>  {
          this._refreshNeeded$.next();
        })
      ); */
    }

    createSubAccount(subAccount: any): Observable<SubAccount> {
      this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        // url += '?token=' + this.token;
        return this.http.post<SubAccount>(URL_SERVICIOS +
           '/api/account/addSubAccount/', subAccount, {headers: this.httpHeaders})
           .pipe(
            tap(() =>  {
              this._refreshNeeded$.next();
            })
            );
      }

      findAccountTypeById(Id): Observable<AccountType> {
        this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
          // url += '?token=' + this.token;
          return this.http.get<AccountType>(`${this.urlEndUpdate2}/${Id}`, { headers: this.httpHeaders});
        }

      findAllSubAccountById(Id: any): Observable<SubAccount[]> {
        console.log('subaccountId ', Id);
        this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
          // url += '?token=' + this.token;
          return this.http.get<SubAccount[]>(`${this.urlEndUpdate}/${Id}`, { headers: this.httpHeaders});
        }

  getAllAccountsType(): Observable<AccountType[]> {
    console.log('GET ALL ACCOUNTS TYPE');
     this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
      // url += '?token=' + this.token;
      return this.http.get<AccountType[]>(URL_SERVICIOS + '/api/account/getAllAccountsType/', {headers: this.httpHeaders});
    }

    getAllSubAccount(): Observable<SubAccount[]> {
      console.log('GET ALL SUBACCOUNT TYPE');
       this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        // url += '?token=' + this.token;
        return this.http.get<SubAccount[]>(URL_SERVICIOS + '/api/account/getAllSubAccount', {headers: this.httpHeaders});
      }

}
