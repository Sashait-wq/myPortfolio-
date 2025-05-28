import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { Loan, Summary } from '../../store/loan/loan.interface';
import { Store } from '@ngrx/store';
import { loadLoan } from '../../store/loan/shopOne.action';
import { loanSelector } from '../../store/loan/shopOne.selectors';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-loans',
  imports: [MatTableModule, MatButton],
  templateUrl: './loans.component.html',
  styleUrl: './loans.component.scss'
})
export class LoansComponent implements OnInit {
  store = inject(Store);

  total: Summary | null = null;

  dataSource: Loan[] = [];

  displayedColumns: string[] = [
    'slNo',
    'amount',
    'leftToRepay',
    'duration',
    'interestRate',
    'installment',
    'repay'
  ];

  ngOnInit(): void {
    this.store.dispatch(loadLoan());
    this.store.select(loanSelector).subscribe((loans) => {
      this.dataSource = loans.data;
      this.total = loans.total;
    });
  }
}
