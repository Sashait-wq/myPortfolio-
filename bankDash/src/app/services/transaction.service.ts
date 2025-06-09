import { Injectable } from '@angular/core';
import { TransactionItem, TransactionSummary } from '../store/transactions/transactions.interface';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends BaseService {
  public getTransaction(): Observable<{
    transactions: TransactionItem[];
    summary: TransactionSummary;
  }> {
    return this.get('transactions');
  }
}
