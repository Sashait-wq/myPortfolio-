import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { transactionsLoad } from '../../store/transactions/transactions.action';
import { transactionsSelector } from '../../store/transactions/transactions.selectors';
import {
  TransactionItem,
  TransactionSummary
} from '../../store/transactions/transactions.interface';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { DatePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-transactions',
  imports: [MatTableModule, NgxSkeletonLoaderComponent, DatePipe, MatButton],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit {
  displayedColumns: string[] = [
    'Description',
    'TransactionID',
    'Type',
    'CardNumber',
    'Date',
    'Amount'
  ];

  loader: boolean = true;
  summaryLoader: boolean = true;

  dataSource: TransactionItem[] = [];

  summary: TransactionSummary | null = null;

  store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(transactionsLoad());
    this.store.select(transactionsSelector).subscribe((response) => {
      this.dataSource = response.transactions;
      this.summary = response.summary;

      this.loader = false;

      if (response.summary && Object.keys(response.summary).length > 0) {
        this.summaryLoader = false;
      }
    });
  }
}
