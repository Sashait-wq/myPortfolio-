import { createAction, props } from '@ngrx/store';
import { Loan, Total } from '../../interfaces/loan.interface';

export enum LoanActionTypes {
  LoadLoan = 'LoadLoan',
  LoadLoanSuccess = 'Load Loan Success',
  LoadLoanError = 'Load Loan Error'
}

export const loadLoan = createAction(LoanActionTypes.LoadLoan);
export const loadLoanSuccess = createAction(
  LoanActionTypes.LoadLoanSuccess,
  props<{ total: Total; data: Loan[] }>()
);
export const loadLoanError = createAction(
  LoanActionTypes.LoadLoanError,
  props<{ error: string }>()
);

// Зробити дз
