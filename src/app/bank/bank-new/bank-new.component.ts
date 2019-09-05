import { Component, OnInit, Injector } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { BankFormService } from '../bank-form.service';
import { SnackbarService } from '../../snackbar/snackbar.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { BankService } from '../bank.service';
import { AccountService } from '../../account/service/account.service';
import { SubAccount } from '../../account/account.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bank-new',
  templateUrl: './bank-new.component.html',
  styleUrls: ['./bank-new.component.css']
})
export class BankNewComponent implements OnInit {

  subAccounts: SubAccount[];
  subaccount = new SubAccount();
  filteredOptions: Observable<SubAccount[]>;


  constructor(public dialogRef: MatDialogRef<BankNewComponent>,
              public bankformService: BankFormService,
              public bankService: BankService,
              public accountService: AccountService,
              public snackBarService: SnackbarService,
              private injector: Injector) {

      this.accountService.getAllSubAccount().subscribe(res => {
        this.subAccounts = res;
      });
  }

  ngOnInit() {
    // console.log('VALUES CHANGES ', this.bankformService.form.get('subAccount').valueChanges);
    this.filteredOptions = this.bankformService.form.get('subAccount').valueChanges
      .pipe(
        startWith<string | SubAccount>(''),
        map(value => typeof value === 'string' ? value : value.nameAccount),
        map(name => name ? this._filter(name) : this.subAccounts.slice())
      );
  }

  displayFn(user?: SubAccount): string | undefined {
    return user ? user.nameAccount : undefined;
  }

  private _filter(name: string): SubAccount[] {
    console.log('NAME ', name);
    this.subaccount = this.bankformService.form.get('subAccount').value;
    console.log('SUBACCOUNT BALUE ', this.subaccount);
    const filterValue = name.toLowerCase();
    return this.subAccounts.filter(option => option.nameAccount.toLowerCase().indexOf(filterValue) === 0);
  }

  cargardatos() {
    this.accountService.getAllSubAccount().subscribe(
      result => {
      if ( result != null ) {
        this.subAccounts = result;
      } else {
        const router = this.injector.get(Router);
        router.navigate(['/account/list']);
        // swal('Mensaje del Servidor:', 'Necesita crear una cuenta Bancaria', 'error');
      }
    });
  }


  filterBank() {
    console.log('Filter Bank');
    this.filteredOptions = this.bankformService.form.get('subAccount').valueChanges
    .pipe(
      startWith<string | SubAccount>(''),
      map(value => typeof value === 'string' ? value : value.nameAccount),
      map(name => name ? this._filter(name) : this.subAccounts.slice())
    );

  }


  onClose() {
    this.bankformService.form.reset();
    this.dialogRef.close();
}

onSubmitMat() {
  this.bankService.createBankAccount(this.bankformService.form.value).subscribe(result => {
  console.log('RESULT ', result);
  this.snackBarService.success(':: Enviado con éxito!');
},
 error => { this.snackBarService.fail(error.error);
});
  this.onClose();
 }
 

 onClear() {
  this.bankformService.form.reset();
  this.bankformService.initializeFormGroup();
  this.snackBarService.success(':: Submitted successfully');
}


}
