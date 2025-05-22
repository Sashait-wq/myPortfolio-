import { LoanEffects } from './loan/shopOne.effects';
import { loanReducer } from './loan/shopOne.reducers';
import { RegistrationEffects } from './registration/registration.effects';
import { registerReducer } from './registration/registration.reducers';
import { transactionsEffect } from './transactions/transactions.effects';
import { transactionReducer } from './transactions/transactions.reducers';

export const store = {
  loan: loanReducer,
  transactions: transactionReducer,
  register: registerReducer
};
export const effects = [LoanEffects, transactionsEffect, RegistrationEffects];
