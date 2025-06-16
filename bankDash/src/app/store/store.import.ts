import { LoanEffects } from './loan/loan.effects';
import { loanReducer } from './loan/loan.reducers';
import { RegistrationEffects } from './registration/registration.effects';
import { registerReducer } from './registration/registration.reducers';
import { transactionsEffect } from './transactions/transactions.effects';
import { transactionReducer } from './transactions/transactions.reducers';
import { creditCardReducer } from './credit-card/credit-card.reducers';
import { CreditCardEffects } from './credit-card/credit-card.effects';

export const store = {
  loan: loanReducer,
  transactions: transactionReducer,
  register: registerReducer,
  creditCard: creditCardReducer
};
export const effects = [LoanEffects, transactionsEffect, RegistrationEffects, CreditCardEffects];
