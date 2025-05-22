import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { transactionsLoad } from '../../store/transactions/transactions.action';
import { transactionsSelector } from '../../store/transactions/transactions.selectors';
import { TransactionItem } from '../../store/transactions/transactions.interface';

@Component({
  selector: 'app-transactions',
  imports: [MatTableModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit {
  displayedColumns: string[] = ['Description', 'TransactionID', 'Type', 'Card', 'Date', 'Amount'];
  dataSource: TransactionItem[] = [];

  store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(transactionsLoad());
    this.store.select(transactionsSelector).subscribe((transactions) => {
      this.dataSource = transactions;
    });
  }
}
