import { createAction, props } from '@ngrx/store';
import { Loan, Summary } from './loan.interface';
import { LoanInformation } from '../../services/loan.service';

export enum LoanActionTypes {
  LoadLoan = '[Load] Loan',
  LoadLoanSuccess = '[Load] Loan Success',
  LoadLoanError = '[Load] Loan Error'
}

export const loadLoan = createAction(LoanActionTypes.LoadLoan);

export const loadLoanSuccess = createAction(
  LoanActionTypes.LoadLoanSuccess,
  props<{ total: Summary; data: Loan[] }>()
);

export const loadLoanError = createAction(
  LoanActionTypes.LoadLoanError,
  props<{ error: string }>()
);

export const loadLoanInfo = createAction('[Load] Loan information');
export const loadLoanInfoSuccess = createAction(
  '[Load] Loan information success',
  props<{ loanInfo: LoanInformation }>()
);
export const loadLoanInfoError = createAction(
  '[Load] Loan information error',
  props<{ error: any }>()
);
