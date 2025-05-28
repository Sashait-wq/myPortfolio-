export interface Loan {
  id: string;
  loanNumber: string;
  amount: number;
  duration: number;
  interestRate: number;
  status: 'active' | 'closed' | string;
  paidAmount: number;
  leftToRepay: number;
  installment: number;
  startDate: string; // ISO date string
  nextPaymentDate: string; // ISO date string
}

export interface Summary {
  totalAmount: number;
  totalLeftToRepay: number;
  totalMonthlyPayment: number;
}
