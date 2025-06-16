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

@Component({
  selector: 'app-transactions',
  imports: [MatTableModule, NgxSkeletonLoaderComponent, DatePipe, MatButton, AsyncPipe],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit {
  private store = inject(Store);

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

  public summary: TransactionSummary | null = null;

  public ngOnInit(): void {
    this.store.dispatch(transactionsLoad());
    this.store.select(transactionsSelector).subscribe((response) => {
      this.dataSource = response.transactions;
      this.summary = response.summary;
    });
  }
}
