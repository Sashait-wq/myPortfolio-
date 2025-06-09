import { createReducer, on } from '@ngrx/store';
import { transactionsLoadSuccess } from './transactions.action';
import { TransactionItem, TransactionSummary } from './transactions.interface';

export interface TransactionState {
  transactions: TransactionItem[];
  summary: TransactionSummary | null;
}

const initialState: TransactionState = {
  transactions: [],
  summary: null
};

export const transactionReducer = createReducer(
  initialState,
  on(transactionsLoadSuccess, (state, { transactions, summary }) => ({
    ...state,
    transactions,
    summary
  }))
);
