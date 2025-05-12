import { Loan, Total } from '../../interfaces/loan.interface';
import { createReducer, on } from '@ngrx/store';
import { loadLoanSuccess } from './shopOne.action';

export interface LoanState {
  total: Total | null;
  data: Loan[];
}

const initialState: LoanState = {
  total: null,
  data: []
};

export const loanReducer = createReducer(
  initialState,
  on(loadLoanSuccess, (state) => {
    debugger;
    return { ...state };
  })
);
