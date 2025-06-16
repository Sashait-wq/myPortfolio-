import { Routes } from '@angular/router';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { TransactionsComponent } from './page/transactions/transactions.component';
import { AccountsComponent } from './page/accounts/accounts.component';
import { CreditCardsComponent } from './page/credit-cards/credit-cards.component';
import { LoansComponent } from './page/loans/loans.component';
import { InvestmentsComponent } from './page/investments/investments.component';
import { SettingComponent } from './page/setting/setting.component';
import { ServicesComponent } from './page/services/services.component';
import { RegistrationComponent } from './page/registration/registration.component';
import { authGuard } from './guards/authGuard';
import { LoginComponent } from './page/login/login.component';
import { AppWrapperComponent } from './page/app-wrapper/app-wrapper.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'app',
    component: AppWrapperComponent,
    canActivateChild: [authGuard],
    children: [
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
        path: 'services',
        component: ServicesComponent,
        data: { title: 'Services' }
      },
      {
        path: 'accounts',
        component: AccountsComponent,
        data: { title: 'Accounts' }
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
