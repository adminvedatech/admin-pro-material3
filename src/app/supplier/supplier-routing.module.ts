import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { SupplierCardComponent } from './supplier-card/supplier-card.component';
import { SupplierNewComponent } from './supplier-new/supplier-new.component';
import { SupplierInvoiceListComponent } from './supplier-invoice-list/supplier-invoice-list.component';

const routes: Routes = [
  {
    path: '',
    component: SupplierListComponent
  },
  {
    path: 'info',
    component: SupplierCardComponent
  },
  {
    path: 'new',
    component: SupplierNewComponent
  },
  {
    path: 'invoice',
    component: SupplierInvoiceListComponent
  },
  {path: 'invoices/:id',
   component: SupplierInvoiceListComponent, data: {titulo: 'Facturacion del Cliente'}
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
