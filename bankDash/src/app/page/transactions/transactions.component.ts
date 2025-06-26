import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { transactionsLoad } from '../../store/transactions/transactions.action';
import {
  transactionsLoadingSelector,
  transactionsSelector
} from '../../store/transactions/transactions.selectors';
import { TransactionItem, TransactionSummary } from '../../interfaces/transactions.interface';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { Observable } from 'rxjs';
import { creditCardSelector } from '../../store/credit-card/credit-card.selectors';
import { Card } from '../../interfaces/card.interface';
import { creditCardLoad } from '../../store/credit-card/credit-card.action';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis
} from 'ng-apexcharts';
import { ExpensesChartComponent } from '../../components/expenses-chart/expenses-chart.component.component';
import { CardsComponent } from '../../components/cards/cards.component';
import { RouterLink } from '@angular/router';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-transactions',
  imports: [
    MatTableModule,
    NgxSkeletonLoaderComponent,
    DatePipe,
    MatButton,
    AsyncPipe,
    ExpensesChartComponent,
    CardsComponent,
    RouterLink
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit {
  private store = inject(Store);

  public cards: Card[] = [];
  public displayedColumns: string[] = [
    'Description',
    'TransactionID',
    'Type',
    'CardNumber',
    'Date',
    'Amount'
  ];

  public loader$: Observable<boolean> = this.store.select(transactionsLoadingSelector);
  public dataSource: TransactionItem[] = [];
  public filteredData: TransactionItem[] = [];
  public summary: TransactionSummary | null = null;

  ngOnInit(): void {
    this.store.dispatch(transactionsLoad());
    this.store.dispatch(creditCardLoad());

    this.store.select(transactionsSelector).subscribe((response) => {
      this.dataSource = response.transactions;
      this.summary = response.summary;
      this.filteredData = [...this.dataSource];
    });

    this.store.select(creditCardSelector).subscribe((card) => {
      this.cards = card;
    });
  }

  public filterByType(type: 'income' | 'expense' | 'all'): void {
    if (type === 'all') {
      this.filteredData = this.dataSource;
    } else {
      this.filteredData = this.dataSource.filter((item) => item.type === type);
    }
  }
}
