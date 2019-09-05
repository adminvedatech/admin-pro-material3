import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AccountType, SubAccount } from '../account.model';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class SubaccountFormService {

  account: AccountType;
  subaccount: SubAccount;

  form = this.formBuilder.group({
    accountType: new FormControl({

    }),
    id: new FormControl(''),
    nameAccount: new FormControl(''),
    accountNumber: new FormControl(''),
    balance: new FormControl(''),
    status: new FormControl(''),

});

  constructor(private formBuilder: FormBuilder,
              private accountService: AccountService) {
  }

  populateForm(account: AccountType) {
   console.log('ACCOUNT ', account);
   this.account = account;
  //  this.subaccount.id = null;
  //  this.subaccount.nameAccount = '';
  //  this.subaccount.accountNumber = '';
  //  this.subaccount.balance = 0;
  //  this.subaccount.status = false;

  }

  editSubAccount(subaccount: SubAccount) {
    this.subaccount = subaccount;
    this.account = subaccount.accountType;
    this.form.get('id').setValue(subaccount.id);
    this.form.get('accountType').setValue(subaccount.accountType);
    this.form.get('nameAccount').setValue(subaccount.nameAccount);
    this.form.get('accountNumber').setValue(subaccount.accountNumber);
    this.form.get('balance').setValue(subaccount.balance);
    this.form.get('status').setValue(subaccount.status);

  }

  initializeFormGroup(id) {
    console.log('ACCOUNT ', id);
  //  this.account = account;
    this.form.get('accountType').setValue(id);
    this.form.get('status').setValue(true);
  }

  

  
}
