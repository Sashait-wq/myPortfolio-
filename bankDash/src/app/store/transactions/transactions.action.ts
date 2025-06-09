import { createAction, props } from '@ngrx/store';
import { TransactionItem, TransactionSummary } from './transactions.interface';

export enum TransactionsActionTypes {
  LoadTransactions = '[Load] All Transactions',
  LoadTransactionsSuccess = '[Load] All Transactions Success',
  LoadTransactionsError = '[Load] All Transactions Error'
}

export const transactionsLoad = createAction(TransactionsActionTypes.LoadTransactions);
export const transactionsLoadSuccess = createAction(
  TransactionsActionTypes.LoadTransactionsSuccess,
  props<{ transactions: TransactionItem[]; summary: TransactionSummary }>()
);
export const transactionLoadError = createAction(
  TransactionsActionTypes.LoadTransactionsError,
  props<{ error: any }>()
);
