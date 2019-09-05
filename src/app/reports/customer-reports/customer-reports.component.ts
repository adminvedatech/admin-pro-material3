import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerReportService } from '../customer-report.service';
import { SalesByProduct } from '../models/reports.models';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-customer-reports',
  templateUrl: './customer-reports.component.html',
  styleUrls: ['./customer-reports.component.css']
})
export class CustomerReportsComponent implements OnInit {

  dateCtrlIni: FormControl;
  dateCtrlFin: FormControl;
  searchKey: string;

  minDate = new Date();
  salesByProduct: SalesByProduct[];
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['cantidad', 'descripcion', 'claveUnidad', 'avgValue', 'importe',  'Acciones'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(reportservice: CustomerReportService) { 

      reportservice.getAllCustomers().subscribe(resp=> {

          this.salesByProduct = resp;
            console.log('SALES BY PRODUCT ', this.salesByProduct);
            this.listData = new MatTableDataSource(this.salesByProduct);
            this.listData.sort = this.sort;
            this.listData.paginator = this.paginator;
            console.log('List Data ', this.listData.data.length);
      });

  }

  ngOnInit() {
    this.dateCtrlIni = new FormControl('', [Validators.required]);
    this.dateCtrlFin = new FormControl('', [Validators.required]);

  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }


}
