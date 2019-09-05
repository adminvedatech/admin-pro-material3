import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/guard/auth.guard';

const routes: Routes = [

  { path: 'account',

  canActivate: [ AuthGuard ],
  loadChildren: './account/account.module#AccountModule'

  },
  { path: 'customer',
  canActivate: [ AuthGuard ],
  loadChildren: './customer/customer.module#CustomerModule'

  },
  { path: 'supplier',
  canActivate: [ AuthGuard ],
  loadChildren: './supplier/supplier.module#SupplierModule'

  },
  { path: 'bank',
  canActivate: [ AuthGuard ],
  loadChildren: './bank/bank.module#BankModule'

  },
   { path: 'messages',
  canActivate: [ AuthGuard ],
  loadChildren: './messages/messages.module#MessagesModule'

 },
 { path: 'reports',
 canActivate: [ AuthGuard ],
 loadChildren: './reports/reports.module#ReportsModule'

},
 { path: 'login',
  component: LoginComponent

 },
  { path: '', redirectTo: '', pathMatch: 'full' },

];

// const routes: Routes = [];

 @NgModule({
  imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
 })

 export class AppRoutingModule { }
// export const APP_ROUTES = RouterModule.forRoot( routes, { useHash: true } );

