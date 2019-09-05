import { Component, OnInit, Injector } from '@angular/core';
import { SubaccountFormService } from '../service/subaccount-form.service';
import { MatDialogRef } from '@angular/material';
import { AccountService } from '../service/account.service';
import { SnackbarService } from 'src/app/snackbar/snackbar.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubAccount, AccountType } from '../account.model';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-subaccount-form',
  templateUrl: './subaccount-form.component.html',
  styleUrls: ['./subaccount-form.component.css']
})
export class SubaccountFormComponent implements OnInit {

  accounts: AccountType[];
  account = new AccountType();
  filteredOptions: Observable<AccountType[]>;

  constructor(public subaccountformService: SubaccountFormService,
    public dialogRef: MatDialogRef<SubaccountFormComponent>,
    private accountService: AccountService,
    private snackBarService: SnackbarService,
    private injector: Injector) {

      this.accountService.getAllAccountsType().subscribe(res => {
        this.accounts = res;
      });
    }


  ngOnInit() {

    console.log('VALUES CHANGES ', this.subaccountformService.form.get('accountType').value);
    this.filteredOptions = this.subaccountformService.form.get('accountType').valueChanges
      .pipe(
        startWith<string | AccountType>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.accounts.slice())
      );
  }


  onClear() {
    this.subaccountformService.form.reset();
    // this.onClose();

  }

  onSubmit() {
    // console.log('SUBMIT ', this.subaccountService.getForm());
       // tslint:disable-next-line:no-unused-expression
      //  this.subaccountService.account;
      //  this.subaccountService.form.get('accountType.id').setValue(this.subaccountService.account.id);
       const data = JSON.stringify(this.subaccountformService.form.value);
       console.log('DATA ', data);
       this.accountService.createSubAccount(data).subscribe(res => {
        console.log('Result ', res);
      });
      //  console.log('SUBMIT ', this.subaccountService.form);
       this.snackBarService.success(':: Enviado con éxito!');
       this.onClose();
    }

    onClose() {
      this.subaccountformService.form.reset();
      // this.subaccountService.initializeFormGroup(this.account);
      this.dialogRef.close();
    }


    cargardatos() {
    this.accountService.getAllAccountsType().subscribe(
      result => {
      if ( result != null ) {
        this.accounts = result;
      } else {
        const router = this.injector.get(Router);
        router.navigate(['/account/list']);
        // swal('Mensaje del Servidor:', 'Necesita crear una cuenta Bancaria', 'error');
      }
    });
  }

  displayFn(user?: AccountType): string | undefined {
    return user ? user.name : undefined;
  }


  filterBank() {
    this.filteredOptions = this.subaccountformService.form.get('accountType').valueChanges
    .pipe(
      startWith<string | AccountType>(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.accounts.slice())
    );

  }

  private _filter(name: string): AccountType[] {
    console.log('NAME ', name);
    this.account = this.subaccountformService.form.get('accountType').value;
    console.log('SUBACCOUNT BALUE ', this.account);
    const filterValue = name.toLowerCase();
    return this.accounts.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

}
