import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { CustomerCardComponent } from './customer-card/customer-card.component';
import { CustomerNewComponent } from './customer-new/customer-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import { ChartsModule } from 'ng2-charts';
import { CustomerInvoiceListComponent } from './customer-invoice-list/customer-invoice-list.component';

@NgModule({
  declarations: [
  CustomerListComponent,
  CustomerCardComponent,
  CustomerNewComponent,
  CustomerInvoiceListComponent
 ],
  entryComponents: [],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatMomentDateModule,
    CustomerRoutingModule,
    ChartsModule,
    NgxMaskModule.forRoot()
  ]
})
export class CustomerModule { }
