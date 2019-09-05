import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { SalesByProduct, FormDate } from '../models/reports.models';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-sales-by-product',
  templateUrl: './sales-by-product.component.html',
  styleUrls: ['./sales-by-product.component.css']
})
export class SalesByProductComponent implements OnInit {

  // dateCtrlIni: FormControl;
  // dateCtrlFin: FormControl;
  searchKey: string;
  formDate: FormGroup;
  total = 0.00;
  ttlpzas = 0;
  avgpu = 0;

  minDate = new Date();
  salesByProduct: SalesByProduct[];
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['cantidad', 'descripcion', 'claveUnidad', 'avgValue', 'importe',  'Acciones'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public reportservice: ReportService,
              public formBuilder: FormBuilder) {

      // reportservice.getSalesByProduct().subscribe(resp => {

      //     this.salesByProduct = resp;
      //       console.log('SALES BY PRODUCT ', this.salesByProduct);
      //       this.listData = new MatTableDataSource(this.salesByProduct);
      //       this.listData.sort = this.sort;
      //       this.listData.paginator = this.paginator;
      //       console.log('List Data ', this.listData.data.length);
      // });

      this.getForm();

  }

  ngOnInit() {
    // this.dateCtrlIni = new FormControl('', [Validators.required]);
    // this.dateCtrlFin = new FormControl('', [Validators.required]);

  }

  getForm() {
    this.formDate = new FormGroup({
      // id: new FormControl(null),
      startDate: new FormControl('', Validators.required),
      finalDate: new FormControl('', Validators.required),

    });
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
    console.log('FILTERED LIST DATA ', this.listData.filter);
    console.log('LIST DATA ', this.listData);
    this.getSumTotal(this.listData.filteredData);
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
    this.getSumTotal(this.listData.filteredData);
  }

  onSubmit() {
    console.log('SUBMIT ', this.formDate);
    const data = JSON.stringify(this.formDate.value);
    console.log('DATA ', data);
    this.reportservice.getSalesByProduct(data).subscribe(resp => {
      this.salesByProduct = resp;
            console.log('SALES BY PRODUCT ', this.salesByProduct);
            this.listData = new MatTableDataSource(this.salesByProduct);
            this.listData.sort = this.sort;
            this.listData.paginator = this.paginator;
            this.getSumTotal(this.salesByProduct);
            console.log('List Data ', this.listData.data.length);
    },
    error => {
    console.log('ERROR ', error);
    });
  }

  getSumTotal(obj: any[]) {
      this.total = 0;
      this.ttlpzas = 0;
    for (let i = 0; i < obj.length; i++) {
      this.total = this.total + obj[i].importe;
      this.ttlpzas = this.ttlpzas + obj[i].cantidad;
    }
    if (this.ttlpzas !== 0 ) {
        this.avgpu = (this.total / this.ttlpzas);
    }
    console.log('TOTAL ', this.total);
  }

}
