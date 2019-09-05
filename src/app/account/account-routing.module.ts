import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountListComponent } from './account-list/account-list.component';
import { SubaccountListComponent } from './subaccount-list/subaccount-list.component';

const routes: Routes = [ {
  path: '',
  component: AccountListComponent
},
{
  path: 'list',
  component: AccountListComponent
},
{
  path: 'subaccount/:id',
  component: SubaccountListComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
