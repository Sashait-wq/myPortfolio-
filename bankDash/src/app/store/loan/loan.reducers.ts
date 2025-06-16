import { Loan, Summary } from '../../interfaces/loan.interface';
import { createReducer, on } from '@ngrx/store';
import {
  loadLoan,
  loadLoanError,
  loadLoanInfo,
  loadLoanInfoError,
  loadLoanInfoSuccess,
  loadLoanSuccess
} from './loan.action';
import { LoanInformation } from '../../request-service/loan.service';

export interface LoanState {
  loanInfo: LoanInformation | null;
  total: Summary | null;
  data: Loan[];
  loading: boolean;
}

const initialState: LoanState = {
  loanInfo: null,
  total: null,
  data: [],
  loading: false
};

export const loanReducer = createReducer(
  initialState,
  on(loadLoan, (state) => ({
    ...state,
    loading: true
  })),
  on(loadLoanSuccess, (state, { total, data }) => ({
    ...state,
    total,
    data,
    loading: false
  })),
  on(loadLoanError, (state, { error }) => ({
    ...state,
    error
  })),

  on(loadLoanInfo, (state) => ({
    ...state,
    loading: true
  })),
  on(loadLoanInfoSuccess, (state, { loanInfo }) => ({
    ...state,
    loanInfo,
    loading: false
  })),
  on(loadLoanInfoError, (state, { error }) => ({
    ...state,
    error
  }))
);
