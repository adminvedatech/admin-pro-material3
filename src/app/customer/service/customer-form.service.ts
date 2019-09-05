import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../customer.model';
import { CustomerService } from './customer.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomerFormService {

  customers: Customer[];
  customerList: Observable<Customer[]>;
 
  constructor(private customerService: CustomerService) { }


  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    company: new FormControl('', Validators.required),
    customerRfc: new FormControl('', [Validators.required, Validators.minLength(8)]),
    storeNum: new FormControl(''),
    balance: new FormControl(''),
    budget: new FormControl(''),
    subAccount: new FormControl(''),
    status: new FormControl(''),
    // isPermanent: new FormControl(false)
  });
  
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      company: '',
      customerRfc: '',
      storeNum: '',
      balance: '',
      budget: '',
      subAccount: '',
      status: ''
   
      // department: 0,
      // hireDate: '',
      // isPermanent: false
    });

  }

  insertCustomer(customer) {
    this.customerService.createCustomer(customer).subscribe(result => {
      console.log('Result Create ', result);

    });
  }

  updateCustomer(customer) {
     this.customerService.createCustomer(customer).subscribe(result => {
      console.log('REsult ', result);
      this.customers = result;
     });
  }

  getCustomers() {
   return this.customerService.getAllCustomers();
    
  }

  deleteEmployee($key: string) {
    // this.customerList.remove($key);
  }

  populateForm(customer) {
    console.log(' CUSTOMER FORM SERVICE ', customer);
    this.form.setValue(customer);
  }

}
