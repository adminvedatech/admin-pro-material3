import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankRoutingModule } from './bank-routing.module';
import { BankListComponent } from './bank-list/bank-list.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { ChartsModule } from 'ng2-charts';
import { NgxMaskModule } from 'ngx-mask';
import { BankNewComponent } from './bank-new/bank-new.component';

@NgModule({
  declarations: [BankListComponent, BankNewComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatMomentDateModule,
    ChartsModule,
    NgxMaskModule.forRoot(),
    BankRoutingModule
  ]
})
export class BankModule { }
