import { createReducer, on } from '@ngrx/store';
import { transactionsLoadSuccess } from './transactions.action';
import { TransactionItem } from './transactions.interface';

export interface TransactionState {
  data: TransactionItem[];
}

const initialState: TransactionState = {
  data: []
};

export const transactionReducer = createReducer(
  initialState,
  on(transactionsLoadSuccess, (state, { data }) => ({
    ...state,
    data
  }))
);
