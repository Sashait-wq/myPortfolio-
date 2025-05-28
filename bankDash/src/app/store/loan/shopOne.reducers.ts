import { Loan, Summary } from './loan.interface';
import { createReducer, on } from '@ngrx/store';
import { loadLoanSuccess } from './shopOne.action';

export interface LoanState {
  total: Summary | null;
  data: Loan[];
}

const initialState: LoanState = {
  total: null,
  data: []
};

export const loanReducer = createReducer(
  initialState,
  on(loadLoanSuccess, (state, { total, data }) => ({
    ...state,
    total,
    data
  }))
);
