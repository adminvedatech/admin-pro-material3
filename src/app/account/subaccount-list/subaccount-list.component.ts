import { Component, OnInit, ViewChild } from '@angular/core';
import { SubAccount, AccountType } from '../account.model';
import { AccountService } from '../service/account.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { SubaccountFormService } from '../service/subaccount-form.service';
import { SubaccountFormComponent } from '../subaccount-form/subaccount-form.component';

@Component({
  selector: 'app-subaccount-list',
  templateUrl: './subaccount-list.component.html',
  styleUrls: ['./subaccount-list.component.css']
})
export class SubaccountListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nameAccount', 'accountNumber', 'balance', 'status', 'Acciones'];
  subaccounts: SubAccount[];

  accountType = {
    name: '',
    account: ''
  };

  accountNumber = '';
  listData: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  id = null;

  constructor(private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    public dialogSubAccount: MatDialog,
    private subaccountFormService: SubaccountFormService) {

      this.activatedRoute.params.subscribe(param => {
          this.id = param.id;
          console.log('ACTIVATED ROUTE PARAM ', param);
          this.accountService.findAccountTypeById(this.id).subscribe(res => {
              this.accountType.name = res.name;
              this.accountType.account = res.account;
              console.log('ACCOUNT TYPE ', this.accountType);
          });
        });

        this.loadSubAccounts(this.id);
     }


  ngOnInit() {

    this.accountService.refreshNeeded$
      .subscribe(() => {
        this.getAllSubAccounts(this.id);
      });
    this.getAllSubAccounts(this.id);
  }

  /*----------------------- Http carga la Invoice que fue enviada -----------------------*/

    loadSubAccounts(param) {
    console.log('PARAM ', param);
    this.accountService.findAllSubAccountById(this.id).subscribe(res => {
        console.log('REs ', res);

        if (res !== null ) {
          this.subaccounts = res;
          // this.accountChanges.next(this.subaccounts);
          console.log('INVOICES ', this.subaccounts);
          this.listData = new MatTableDataSource(this.subaccounts);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
          console.log('List Data ', this.listData.data.length);
          // this.progress.percentage = 0;
        } else {
          // swal('Error!', 'No Existen facturas!', 'warning');
        }
      });
    }


    applyFilter() {
      this.listData.filter = this.searchKey.trim().toLowerCase();
    }


    onSearchClear() {
      this.searchKey = '';
      this.applyFilter();
    }


    onCreate() {
      this.subaccountFormService.initializeFormGroup(this.id);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';
      this.dialogSubAccount.open(SubaccountFormComponent, dialogConfig);
    }


    onEdit(row) {
       this.subaccountFormService.editSubAccount(row);
      const dialogConfig1 = new MatDialogConfig();
      dialogConfig1.disableClose = true;
      dialogConfig1.autoFocus = true;
      dialogConfig1.width = '60%';
      this.dialogSubAccount.open(SubaccountFormComponent, dialogConfig1);
    }


    getAllSubAccounts(param) {
      this.accountService.findAllSubAccountById(param).subscribe(res => {
        this.subaccounts = res;
        this.listData = new MatTableDataSource(this.subaccounts);
      });
    }



}
