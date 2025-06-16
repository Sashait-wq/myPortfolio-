import { createReducer, on } from '@ngrx/store';
import {
  transactionLoadError,
  transactionsLoad,
  transactionsLoadSuccess
} from './transactions.action';
import { TransactionItem, TransactionSummary } from '../../interfaces/transactions.interface';

export interface TransactionState {
  transactions: TransactionItem[];
  summary: TransactionSummary | null;
  loading: boolean;
}

const initialState: TransactionState = {
  transactions: [],
  summary: null,
  loading: false
};

export const transactionReducer = createReducer(
  initialState,
  on(transactionsLoad, (state) => ({
    ...state,
    loading: true
  })),
  on(transactionsLoadSuccess, (state, { transactions, summary }) => ({
    ...state,
    transactions,
    summary,
    loading: false
  })),
  on(transactionLoadError, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
