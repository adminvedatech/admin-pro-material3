import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { SupplierCardComponent } from './supplier-card/supplier-card.component';
import { SupplierNewComponent } from './supplier-new/supplier-new.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { ChartsModule } from 'ng2-charts';
import { NgxMaskModule } from 'ngx-mask';
import { SupplierInvoiceListComponent } from './supplier-invoice-list/supplier-invoice-list.component';

@NgModule({
  declarations: [SupplierListComponent, SupplierCardComponent, SupplierNewComponent, SupplierInvoiceListComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatMomentDateModule,
    ChartsModule,
    NgxMaskModule.forRoot(),
    SupplierRoutingModule
  ]
})
export class SupplierModule { }
