export interface Total {
  loan: number;
  repay: number;
  month: string;
}

export interface Loan {
  'SL No': number;
  'Loan Money': string;
  'Left to repay': number;
  Duration: string;
  'Interest rate': number;
  Installment: number;
  Repay: number;
}
