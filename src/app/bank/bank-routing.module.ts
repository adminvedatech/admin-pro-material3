import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankListComponent } from './bank-list/bank-list.component';
import { BankNewComponent } from './bank-new/bank-new.component';


const routes: Routes = [
  {
    path: '',
    component: BankListComponent
  },
  {
    path: 'create',
    component: BankNewComponent
  },


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankRoutingModule { }
