import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { CustomerReportsComponent } from './customer-reports/customer-reports.component';
import { SalesByProductComponent } from './sales-by-product/sales-by-product.component';

@NgModule({
  declarations: [ReportsComponent, CustomerReportsComponent, SalesByProductComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ReportsRoutingModule,
  ]
})
export class ReportsModule { }
