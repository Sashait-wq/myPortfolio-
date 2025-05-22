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
import { RegistrationComponent } from './components/registration/registration.component';
import { registrationGuard } from './guards/registration.guard';

export const routes: Routes = [
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Overview' },
    canActivate: [registrationGuard]
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
    data: { title: 'Transactions' },
    canActivate: [registrationGuard]
  },
  {
    path: 'credit-cards',
    component: CreditCardsComponent,
    data: { title: 'Credit Cards' },
    canActivate: [registrationGuard]
  },
  {
    path: 'loans',
    component: LoansComponent,
    data: { title: 'Loans' },
    canActivate: [registrationGuard]
  },
  {
    path: 'investments',
    component: InvestmentsComponent,
    data: { title: 'Investments' },
    canActivate: [registrationGuard]
  },
  {
    path: 'settings',
    component: SettingComponent,
    data: { title: 'Setting' },
    canActivate: [registrationGuard]
  },
  {
    path: 'privileges',
    component: MyPrivilegesComponent,
    data: { title: 'Privileges' },
    canActivate: [registrationGuard]
  },
  {
    path: 'services',
    component: ServicesComponent,
    data: { title: 'Services' },
    canActivate: [registrationGuard]
  },
  {
    path: 'accounts',
    component: AccountsComponent,
    data: { title: 'Accounts' },
    canActivate: [registrationGuard]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
