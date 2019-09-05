import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { AccountType } from 'src/app/account/account.model';
import { CustomerFormService } from '../service/customer-form.service';
import { SnackbarService } from 'src/app/snackbar/snackbar.service';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-customer-new',
  templateUrl: './customer-new.component.html',
  styleUrls: ['./customer-new.component.css']
})
export class CustomerNewComponent implements OnInit {

  accounting: AccountType[];
  customers: Customer[];

  constructor(public dialogRef: MatDialogRef<CustomerNewComponent>,
    private snackBarService: SnackbarService,
    public customerFormService: CustomerFormService,
   ) {
       this.loadAccounting();
      // this.createForm();
    }

    ngOnInit() {
    // console.log('AL CARGAR FORM ES ', this.createForm());

    }



onSubmitMat() {
  if (this.customerFormService.form.valid) {
    if (!this.customerFormService.form.get('id').value) {
      this.customerFormService.insertCustomer(this.customerFormService.form.value);
    } else {
      this.customerFormService.updateCustomer(this.customerFormService.form.value);
    }
    this.customerFormService.form.reset();
    this.customerFormService.initializeFormGroup();
    this.snackBarService.success(':: Submitted successfully');
    this.onClose();
   }
 }


  onClose() {
    this.customerFormService.form.reset();
    this.customerFormService.initializeFormGroup();
    this.dialogRef.close();
}

  onClear() {
  this.customerFormService.form.reset();
  this.customerFormService.initializeFormGroup();
  this.snackBarService.success(':: Submitted successfully');
}

loadAccounting() {
  // this.accountService.getAllAccountsType()
  // .subscribe(result => {
  //   console.log('Accounting ', result);
  //   this.accounting = result;
  // });
}


}
