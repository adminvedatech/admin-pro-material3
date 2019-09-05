import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Bank } from './bank.models';
import { SubAccount } from '../account/account.model';

@Injectable({
  providedIn: 'root'
})
export class BankFormService {

  bank: Bank;

  constructor(private formBuilder: FormBuilder) { }

  // formA: FormGroup = new FormGroup({
  //   id: new FormControl(null),
  //   nameBank: new FormControl('', Validators.required),
  //   accountNumber: new FormControl('', [Validators.required, Validators.minLength(8)]),
  //   balance: new FormControl(''),
  //   balanceToday: new FormControl(''),
  //   // subAccount: new FormControl(''),
  // });

  form = this.formBuilder.group({
    subAccount: new FormControl({
    // id: new FormControl(''),
    // name: new FormControl('')
  }),
    id: new FormControl(''),
    nameBank: new FormControl(''),
    accountNumber: new FormControl(''),
    balance: new FormControl(''),
    balanceToday: new FormControl('')
});

  initializeFormGroup() {
    // this.form.setValue({
    //   id: null,
    //   nameBank: '',
    //   accountNumber: '',
    //   balance: '',
    //   balanceToday: '',
    //   // subAccount: '',
    //   // department: 0,
    //   // hireDate: '',
    //   // isPermanent: false
    // });

    // this.form.get('id').setValue('');
    // this.form.get('bankName').setValue('');
    // this.form.get('accountNumber').setValue('');
    // this.form.get('balance').setValue('');
    // this.form.get('balanceToday').setValue('');
    // this.form.get('subAccount.id').setValue('');
    const data = JSON.stringify(this.form.value);
       console.log('DATA ', data);
    console.log('THIS FORM ', this.form);

  }

  editBank(obj: Bank) {
    this.bank = obj;
    // this.account = subaccount.accountType;
    this.form.get('id').setValue(obj.id);
    this.form.get('nameBank').setValue(obj.nameBank);
    this.form.get('accountNumber').setValue(obj.accountNumber);
    this.form.get('balance').setValue(obj.balance);
    this.form.get('balanceToday').setValue(obj.balanceToday);
    this.form.get('subAccount').setValue(obj.subAccount);

  }

}
