import { createFeatureSelector, createSelector } from '@ngrx/store';
import { creditCardState } from './credit-card.reducers';

export const creditCardFeaturesSelector = createFeatureSelector<creditCardState>('creditCard');
export const creditCardSelector = createSelector(creditCardFeaturesSelector, (state) => state.card);
export const creditCardLoading = createSelector(
  creditCardFeaturesSelector,
  (state) => state.loading
);
