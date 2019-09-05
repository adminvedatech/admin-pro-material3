import { Component, OnInit, ViewChild } from '@angular/core';
import { SnackbarService } from 'src/app/snackbar/snackbar.service';
import { AccountService } from 'src/app/account/service/account.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { CustomerService } from '../service/customer.service';
import { Invoice, Customer } from '../customer.model';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { Subject } from 'rxjs';
import { CustomerNewComponent } from '../customer-new/customer-new.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerFormService } from '../service/customer-form.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  totalBalance = 0;
  listData: MatTableDataSource<any>;
  customerSub: Subject<Customer[]> = new Subject();
  displayedColumns: string[] = [
    'id',
    'company',
    'storeNum',
    'subAccount',
    'balance',
    'budget',
    'actions'
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  customers: Customer[];
  dataSource: Subject<Customer[]> = new Subject();

  constructor(
    private customerService: CustomerService,
    private customerFormService: CustomerFormService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notificationService: SnackbarService,
    public dialog: MatDialog ) {

      this.activatedRoute.params.subscribe(params => {
      console.log('Result ', params);
      this.customerService.getAllCustomers().subscribe(result => {
        this.customers = result;
        if (result !== null) {
          console.log('CUSTOMERS ', this.customers);
          this.listData = new MatTableDataSource(this.customers);
          this.dataSource.next(this.customers);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
        } else {
          // swal('Error!', 'No Existen facturas!', 'warning');
        }
      });
    });
  }

  ngOnInit() {
    this.loadCustomers();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
    this.getSumTotal(this.listData.filteredData);

  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
    this.getSumTotal(this.listData.filteredData);
  }

  onCreate() {
    console.log('ON CREATE ');
    this.customerFormService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    // dialogConfig.height = '60%';
    this.dialog.open(CustomerNewComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(res =>
      setTimeout( () => this.loadCustomers(), 1000 )
    );
  }

  onEdit(row) {
    this.customerFormService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(CustomerNewComponent, dialogConfig);
    // this.dialog.closeAll();
    this.dialog.afterAllClosed.subscribe(resp => {
      this.customerService.getAllCustomers().subscribe(res => {
        this.customers = res;
        this.customerSub.next(this.customers);
        this.listData = new MatTableDataSource(this.customers);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      });
    });
  }

  onCustomerInvoiceList(id) {
    this.router.navigate(['/customer/invoices', id]);
  }

  onAssess(id) {
    // this.customerService.assessCustomer(id).subscribe( res => {
    //   console.log('Result Assess ', res);
    // });
  }

  onDelete($key) {
    if (confirm('Are you sure to delete this record ?')) {
      // this.customerFormService.deleteEmployee($key);
      this.notificationService.warn('! Deleted successfully');
    }
  }

  loadCustomers() {
    this.customerService.getAllCustomers().subscribe(res => {
      this.customers = res;
      this.customerSub.next(this.customers);
      this.listData = new MatTableDataSource(this.customers);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      this.getSumTotal(this.listData.filteredData);
    });
  }

  getSumTotal(obj: any[]) {
    this.totalBalance = 0;
  for (let i = 0; i < obj.length; i++) {
    this.totalBalance = this.totalBalance + obj[i].balance;
  }
 
  console.log('TOTAL ', this.totalBalance);

}

}
