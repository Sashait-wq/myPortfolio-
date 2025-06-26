import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CreateCreditCardState, CreditCardState } from './credit-card.reducers';

export const creditCardFeaturesSelector = createFeatureSelector<CreditCardState>('creditCard');
export const creditCardSelector = createSelector(creditCardFeaturesSelector, (state) => state.card);
export const creditCardLoading = createSelector(
  creditCardFeaturesSelector,
  (state) => state.loading
);

export const selectCreateCreditCardState =
  createFeatureSelector<CreateCreditCardState>('createCreditCard');

export const selectCreatedCreditCard = createSelector(
  selectCreateCreditCardState,
  (state) => state.card
);

export const selectCreateCreditCardLoading = createSelector(
  selectCreateCreditCardState,
  (state) => state.loading
);

export const selectCreateCreditCardError = createSelector(
  selectCreateCreditCardState,
  (state) => state.error
);
