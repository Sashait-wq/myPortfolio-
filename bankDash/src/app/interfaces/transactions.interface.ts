export interface TransactionItem {
  id: string;
  transactionId: string;
  description: string;
  type: string;
  cardNumber: string;
  amount: number;
  date: string;
}

export interface TransactionSummary {
  total: number;
  income: number;
  expense: number;
}
