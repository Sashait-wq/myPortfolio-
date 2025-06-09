import { Loan, Summary } from './loan.interface';
import { createReducer, on } from '@ngrx/store';
import { loadLoanInfoSuccess, loadLoanSuccess } from './shopOne.action';
import { LoanInformation } from '../../services/loan.service';

export interface LoanState {
  loanInfo: LoanInformation | null;
  total: Summary | null;
  data: Loan[];
}

const initialState: LoanState = {
  loanInfo: null,
  total: null,
  data: []
};

export const loanReducer = createReducer(
  initialState,
  on(loadLoanSuccess, (state, { total, data }) => ({
    ...state,
    total,
    data
  })),
  on(loadLoanInfoSuccess, (state, { loanInfo }) => ({
    ...state,
    loanInfo
  }))
);
