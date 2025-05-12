import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoanState } from './shopOne.reducers';

export const loansFeaturesSelector = createFeatureSelector<LoanState>('loan');
export const loanSelector = createSelector(loansFeaturesSelector, (state) => state);
