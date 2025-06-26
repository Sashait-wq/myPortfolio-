import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { Loan, Summary } from '../../interfaces/loan.interface';
import { Store } from '@ngrx/store';
import { loadLoan, loadLoanInfo } from '../../store/loan/loan.action';
import { loanInfoSelector, loanLoading, loanSelector } from '../../store/loan/loan.selectors';
import { LoanInformation } from '../../request-service/loan.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-loans',
  imports: [MatTableModule, MatButton, NgxSkeletonLoaderModule, AsyncPipe],
  templateUrl: './loans.component.html',
  styleUrl: './loans.component.scss'
})
export class LoansComponent implements OnInit {
  store = inject(Store);
  total: Summary | null = null;

  loader: Observable<boolean> = this.store.select(loanLoading);
  loanInformation: LoanInformation | null = null;

  dataSource = new MatTableDataSource<Loan>();
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
      this.loanInformation = loanInfo;
    });

    this.store.dispatch(loadLoan());
    this.store.select(loanSelector).subscribe((loans) => {
      this.dataSource = new MatTableDataSource(loans.data);
      this.total = loans.total;
    });
  }
}
