import { Component, inject, OnInit } from '@angular/core';
import { Card } from '../../interfaces/card.interface';
import { DashboardService } from '../../request-service/dashboard.service';
import { TransactionItem } from '../../interfaces/transactions.interface';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { CardsComponent } from '../../components/cards/cards.component';
import { BalanceHistory, ExpenseStat, QuickTransfer, WeeklyActivity } from './dashboard.interface';
import { WeeklyTransactionChartComponent } from '../../components/weekly-transaction-chart/weekly-transaction-chart.component';
import { ExpensePieChartComponent } from '../../components/expense-pie-chart/expense-pie-chart.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BalanceHistoryChartComponent } from '../../components/balance-history-chart/balance-history-chart.component';
import { LangController } from '../../components/switch-language/lang-controller.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    DatePipe,
    CardsComponent,
    NgClass,
    CurrencyPipe,
    WeeklyTransactionChartComponent,
    ExpensePieChartComponent,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    BalanceHistoryChartComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  private langController = inject(LangController);

  public form = new FormGroup({
    name: new FormControl<string | null>(null),
    count: new FormControl<number | null>(null, [Validators.required, Validators.min(0)])
  });

  public seeAll: string = this.langController.getTranslate('DASHBOARD.SEE_ALL');
  public seeAll2: string = '';

  public cards: Card[] = [];
  public recentTransactions: TransactionItem[] = [];
  public expenseStats: ExpenseStat[] = [];
  public weeklyActivity!: WeeklyActivity;
  public quickTransfer: QuickTransfer[] = [
    { name: 'Sasha', count: 122 },
    { name: 'Dima', count: 122 },
    { name: 'Roma', count: 122 }
  ];

  public balanceHistory: BalanceHistory[] = [];

  ngOnInit(): void {
    this.dashboardService.getDashboard().subscribe((data) => {
      this.cards = data.cards;
      this.recentTransactions = data.recentTransactions;
      this.weeklyActivity = data.weeklyActivity;
      this.expenseStats = data.expenseStats;
      this.balanceHistory = data.balanceHistory;
    });

    this.langController.getTranslate$('DASHBOARD.SEE_ALL').subscribe((data) => {
      this.seeAll2 = data;
    });
  }

  public clickForName(name: string): void {
    this.form.patchValue({ name: name });
  }

  public submit(): void {
    if (this.form.invalid) return;

    let count = this.form.controls['count'];
    if (count !== null && count !== undefined) {
      this.cards = this.cards.map((card) => {
        const newBalance = Number(card.balance) - Number(count.value);
        return {
          ...card,
          balance: newBalance.toString()
        };
      });
      console.log(this.cards);
      console.log(this.form.value);
    }
  }

  public getImageByDescription(desc: string): string {
    switch (desc) {
      case 'Deposit from my Card':
        return 'assets/dashboardImg/deposit.svg';
      case 'Deposit Paypal':
        return 'assets/dashboardImg/paypal.svg';
      default:
        return 'assets/dashboardImg/transfer.svg';
    }
  }

  public getClassByDescription(desc: string): string {
    switch (desc) {
      case 'Deposit from my Card':
        return 'img-deposit';
      case 'Deposit Paypal':
        return 'img-paypal';
      default:
        return 'img-default';
    }
  }
}
