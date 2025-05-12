import { Routes } from '@angular/router';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { TransactionsComponent } from './page/transactions/transactions.component';
import { AccountsComponent } from './page/accounts/accounts.component';
import { CreditCardsComponent } from './page/credit-cards/credit-cards.component';
import { LoansComponent } from './page/loans/loans.component';
import { InvestmentsComponent } from './page/investments/investments.component';
import { SettingComponent } from './page/setting/setting.component';
import { MyPrivilegesComponent } from './page/my-privileges/my-privileges.component';
import { ServicesComponent } from './page/services/services.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Dashboard' }
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
    data: { title: 'transactions' }
  },
  {
    path: 'credit-cards',
    component: CreditCardsComponent,
    data: { title: 'credit-cards' }
  },
  {
    path: 'loans',
    component: LoansComponent,
    data: { title: 'loans' }
  },
  {
    path: 'investments',
    component: InvestmentsComponent,
    data: { title: 'investments' }
  },
  {
    path: 'settings',
    component: SettingComponent,
    data: { title: 'settings' }
  },
  {
    path: 'privileges',
    component: MyPrivilegesComponent,
    data: { title: 'privileges' }
  },
  {
    path: 'services',
    component: ServicesComponent,
    data: { title: 'services' }
  },
  {
    path: 'accounts',
    component: AccountsComponent,
    data: { title: 'accounts' }
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
