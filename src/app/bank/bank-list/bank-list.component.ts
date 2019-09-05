import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { Subject } from 'rxjs';
import { Bank } from '../bank.models';
import { ActivatedRoute } from '@angular/router';
import { SnackbarService } from 'src/app/snackbar/snackbar.service';
import { BankService } from '../bank.service';
import { BankFormService } from '../bank-form.service';
import { BankNewComponent } from '../bank-new/bank-new.component';


@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.css'],
})

export class BankListComponent implements OnInit {

  totalBalance = 0;
  banks: Bank[];
  searchKey: string;
  listData: MatTableDataSource<any>;
  dataSource: Subject<Bank[]> = new Subject();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['id', 'subAccount', 'nameBank', 'accountNumber', 'balance', 'balanceToday', 'acciones'];

  constructor(private bankService: BankService, private activatedRoute: ActivatedRoute,
    private notificationService: SnackbarService,
    private bankformService: BankFormService,
    public dialog: MatDialog) {

    this.activatedRoute.params.subscribe(params => {

      this.bankService.getAllBanks().subscribe(result => {
        this.banks = result;
        if (result !== null) {
          this.getAllBankAccount();
        }
      });
    });

  }

  ngOnInit() {
    this.bankService.refreshNeeded$
      .subscribe(() => {
        this.getAllBankAccount();
      });
    this.getAllBankAccount();
  }

  onCreate() {
    this.bankformService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    // dialogConfig.height = '60%';
    this.dialog.open(BankNewComponent, dialogConfig);
  }

  onCustomerInvoiceList(id) {
    console.log('ON CUSTOMER INVOICE LIST', id);
  }

  onAssess(id) {
    console.log('ON ASSESS ');
  }

  onEdit(element) {
    this.bankformService.editBank(element);
    const dialogConfig1 = new MatDialogConfig();
    dialogConfig1.disableClose = true;
    dialogConfig1.autoFocus = true;
    dialogConfig1.width = '60%';
    this.dialog.open(BankNewComponent, dialogConfig1);
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

  getSumTotal(obj: any[]) {
    this.totalBalance = 0;
    for (let i = 0; i < obj.length; i++) {
      this.totalBalance = this.totalBalance + obj[i].balance;
    }
  }

  getAllBankAccount() {
    this.bankService.getAllBanks().subscribe(res => {
      this.banks = res;
      this.listData = new MatTableDataSource(this.banks);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;

    });
  }

}


