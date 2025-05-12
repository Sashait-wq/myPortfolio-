import { LoanEffects } from './loan/shopOne.effects';
import { loanReducer } from './loan/shopOne.reducers';

export const store = { loan: loanReducer };
export const effects = [LoanEffects];
