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
    component: DashboardComponent
  },
  {
    path: 'transactions',
    component: TransactionsComponent
  },
  {
    path: 'credit-cards',
    component: CreditCardsComponent
  },
  {
    path: 'loans',
    component: LoansComponent
  },
  {
    path: 'investments',
    component: InvestmentsComponent
  },
  {
    path: 'settings',
    component: SettingComponent
  },
  {
    path: 'privileges',
    component: MyPrivilegesComponent
  },
  {
    path: 'services',
    component: ServicesComponent
  },
  {
    path: 'accounts',
    component: AccountsComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
