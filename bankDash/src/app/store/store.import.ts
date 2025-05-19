import { LoanEffects } from './loan/shopOne.effects';
import { loanReducer } from './loan/shopOne.reducers';
import { transactionReducer } from './transactions/transactions.reducers';

export const store = { loan: loanReducer, transactions: transactionReducer };
export const effects = [LoanEffects];
