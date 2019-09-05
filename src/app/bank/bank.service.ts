import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Bank } from './bank.models';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/urls';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) { }

  getAllBanks(): Observable<Bank[]> {
    console.log('GET ALL ACCOUNTS TYPE');
     this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
      // url += '?token=' + this.token;
      return this.http.get<Bank[]>(URL_SERVICIOS + '/api/bank/getAllBankAccounts', {headers: this.httpHeaders})
      // .pipe(
      //   tap(() =>  {
      //     this._refreshNeeded$.next();
      //   })
      //  );

    }

    createBankAccount(object: Bank): Observable<Bank[]> {
      this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        // url += '?token=' + this.token;
        return this.http.post<Bank[]>(URL_SERVICIOS +
            '/api/bank/addBankAccount', object, {headers: this.httpHeaders})
            .pipe(
            tap(() =>  {
              this._refreshNeeded$.next();
            })
            );
      }
}

