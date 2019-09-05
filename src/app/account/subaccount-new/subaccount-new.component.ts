import { Component, OnInit } from '@angular/core';
import { SubaccountFormService } from '../service/subaccount-form.service';
import { AccountType, AccountType2 } from '../account.model';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material';
import { AccountService } from '../service/account.service';
import { SnackbarService } from '../../snackbar/snackbar.service';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-subaccount-new',
  templateUrl: './subaccount-new.component.html',
  styleUrls: ['./subaccount-new.component.css']
})
export class SubaccountNewComponent implements OnInit {

  accounts: AccountType2[];
  account = new AccountType2();
  filteredOptions: Observable<AccountType2[]>;

  constructor(public subaccountformService: SubaccountFormService,
              public dialogRef: MatDialogRef<SubaccountNewComponent>,
              public accountService: AccountService,
              public snackbar: SnackbarService
              ) {
                this.accountService.getAllAccountsType().subscribe(res => {
                  this.accounts = res;
                });
               }

  ngOnInit() {

      console.log('VALUES CHANGES ', this.subaccountformService.form.get('subAccount').valueChanges);
     this.filteredOptions = this.subaccountformService.form.get('accountType').valueChanges
     .pipe(
       startWith<string | AccountType2>(''),
       map(value => typeof value === 'string' ? value : value.name),
       map(name => name ? this._filter(name) : this.accounts.slice())
     );
  }

  cargardatos() {
    this.accountService.getAllAccountsType().subscribe(
      result => {
      if ( result != null ) {
        this.accounts = result;
      } else {
      this.snackbar.warn('no existen datos');
      }
    });
  }

  private _filter(name: string): AccountType2[] {
    console.log('NAME ', name);
    // this.account = this.subaccountformService.form.get('accountType').value;
    console.log('SUBACCOUNT BALUE ', this.account);
    const filterValue = name.toLowerCase();
    return this.accounts.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }


  filterBank() {

    this.filteredOptions = this.subaccountformService.form.get('accountType').valueChanges
    .pipe(
      startWith<string | AccountType2>(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.accounts.slice())
    );
  }

  displayFn(param?: AccountType2): string | undefined {
    return param ? param.name + param.account : undefined;
  }

  onClear() {

  }

  onClose() {
    this.subaccountformService.form.reset();
    this.dialogRef.close();

  }

  onSubmitMat() {
    this.accountService.createSubAccount(this.subaccountformService.form.value).subscribe(result => {
    console.log('RESULT ', result);
    this.snackbar.success(':: Enviado con éxito!');
  },
   error => { this.snackbar.fail(error.error);
  });
    this.onClose();
   }

 
}
