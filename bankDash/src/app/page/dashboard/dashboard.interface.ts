import { Card } from '../../interfaces/card.interface';
import { TransactionItem } from '../../interfaces/transactions.interface';

// Response
export interface DashboardCard extends Card {}
export interface DashboardTransaction extends TransactionItem {}
export interface WeeklyActivity {
  days: string[];
  deposit: number[];
  withdraw: number[];
}
export interface ExpenseStat {
  category: string;
  percent: number;
}
export interface QuickTransfer {
  name: string;
  count: number;
}
export interface BalanceHistory {
  month: string;
  balance: number;
}
export interface DashboardResponse {
  cards: DashboardCard[];
  recentTransactions: DashboardTransaction[];
  balance: number;
  weeklyActivity: WeeklyActivity;
  expenseStats: ExpenseStat[];
  quickTransfer: QuickTransfer[];
  balanceHistory: BalanceHistory[];
}
