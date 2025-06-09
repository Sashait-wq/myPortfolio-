import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { Loan, Summary } from '../../store/loan/loan.interface';
import { Store } from '@ngrx/store';
import { loadLoan, loadLoanInfo } from '../../store/loan/shopOne.action';
import { loanInfoSelector, loanSelector } from '../../store/loan/shopOne.selectors';
import { LoanInformation } from '../../services/loan.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-loans',
  imports: [MatTableModule, MatButton, NgxSkeletonLoaderModule],
  templateUrl: './loans.component.html',
  styleUrl: './loans.component.scss'
})
export class LoansComponent implements OnInit {
  store = inject(Store);

  total: Summary | null = null;

  loanInfoLoad: boolean = true;
  loanInformation: LoanInformation | null = null;

  loader: boolean = true;
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
    this.store.dispatch(loadLoanInfo());

    this.store.select(loanInfoSelector).subscribe((loanInfo) => {
      if (loanInfo && Object.keys(loanInfo).length > 0) {
        this.loanInformation = loanInfo;
        this.loanInfoLoad = false;
      }
    });

    this.store.dispatch(loadLoan());
    this.store.select(loanSelector).subscribe((loans) => {
      this.dataSource = loans.data;
      this.total = loans.total;
      this.loader = false;
    });
  }
}
