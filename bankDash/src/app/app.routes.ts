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
    data: { title: 'Overview' }
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
    data: { title: 'Transactions' }
  },
  {
    path: 'credit-cards',
    component: CreditCardsComponent,
    data: { title: 'Credit Cards' }
  },
  {
    path: 'loans',
    component: LoansComponent,
    data: { title: 'Loans' }
  },
  {
    path: 'investments',
    component: InvestmentsComponent,
    data: { title: 'Investments' }
  },
  {
    path: 'settings',
    component: SettingComponent,
    data: { title: 'Setting' }
  },
  {
    path: 'privileges',
    component: MyPrivilegesComponent,
    data: { title: 'Privileges' }
  },
  {
    path: 'services',
    component: ServicesComponent,
    data: { title: 'Services' }
  },
  {
    path: 'accounts',
    component: AccountsComponent,
    data: { title: 'Accounts' }
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
