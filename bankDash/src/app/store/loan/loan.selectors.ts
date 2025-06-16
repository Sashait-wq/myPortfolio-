import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoanState } from './loan.reducers';

export const loansFeaturesSelector = createFeatureSelector<LoanState>('loan');
export const loanSelector = createSelector(loansFeaturesSelector, (state) => state);
export const loanInfoSelector = createSelector(loansFeaturesSelector, (state) => state.loanInfo);
export const loanLoading = createSelector(loansFeaturesSelector, (state) => state.loading);
