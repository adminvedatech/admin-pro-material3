import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerCardComponent } from './customer-card/customer-card.component';
import { CustomerNewComponent } from './customer-new/customer-new.component';
import { CustomerInvoiceListComponent } from './customer-invoice-list/customer-invoice-list.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent
  },
  {
    path: 'info',
    component: CustomerCardComponent
  },
  {
    path: 'new',
    component: CustomerNewComponent
  },
  {
    path: 'invoice',
    component: CustomerInvoiceListComponent
  },
  {path: 'invoices/:id',
   component: CustomerInvoiceListComponent, data: {titulo: 'Facturacion del Cliente'}
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
