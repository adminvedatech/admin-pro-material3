import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountListComponent } from './account-list/account-list.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubaccountFormComponent } from './subaccount-form/subaccount-form.component';
import { SubaccountListComponent } from './subaccount-list/subaccount-list.component';
import { SubaccountNewComponent } from './subaccount-new/subaccount-new.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [AccountListComponent, SubaccountFormComponent, SubaccountListComponent, SubaccountNewComponent ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    NgxMaskModule.forRoot()

  ],
  entryComponents: [SubaccountFormComponent, SubaccountNewComponent]
})
export class AccountModule { }
