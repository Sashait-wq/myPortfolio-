import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TransactionState } from './transactions.reducers';

export const transactionsFeaturesSelector = createFeatureSelector<TransactionState>('transactions');
export const transactionsSelector = createSelector(transactionsFeaturesSelector, (state) => state);
export const transactionsLoadingSelector = createSelector(
  transactionsFeaturesSelector,
  (state) => state.loading
);
