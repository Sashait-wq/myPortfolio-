import { createAction, props } from '@ngrx/store';
import { Loan, Summary } from '../../interfaces/loan.interface';
import { LoanInformation } from '../../request-service/loan.service';

export enum LoanActionTypes {
  LoadLoan = '[Load] Loan',
  LoadLoanSuccess = '[Load] Loan Success',
  LoadLoanError = '[Load] Loan Error',
  loanInformation = '[Loan] Loan information',
  loanInformationSuccess = '[Loan] Loan information Success',
  loanInformationError = '[Loan] Loan information Error'
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

export const loadLoanInfo = createAction(LoanActionTypes.loanInformation);
export const loadLoanInfoSuccess = createAction(
  LoanActionTypes.loanInformationSuccess,
  props<{ loanInfo: LoanInformation }>()
);
export const loadLoanInfoError = createAction(
  LoanActionTypes.loanInformationError,
  props<{ error: any }>()
);
