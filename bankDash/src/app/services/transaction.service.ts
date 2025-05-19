import { Injectable } from '@angular/core';
import { TransactionItem } from '../interfaces/transactions.interface';
import { Observable, of } from 'rxjs';

export const transactions: TransactionItem[] = [
  {
    Description: 'Оплата в магазині',
    TransactionID: 'TXN0001',
    Type: 1,
    Card: 12345678,
    Date: 1715721600000,
    Amount: -250.5
  },
  {
    Description: 'Переказ від друга',
    TransactionID: 'TXN0002',
    Type: 2,
    Card: 87654321,
    Date: 1715808000000,
    Amount: 500.0
  },
  {
    Description: 'Комісія банку',
    TransactionID: 'TXN0003',
    Type: 3,
    Card: 11223344,
    Date: 1715894400000,
    Amount: -15.75
  },
  {
    Description: 'Оплата послуг інтернету',
    TransactionID: 'TXN0004',
    Type: 1,
    Card: 44332211,
    Date: 1715980800000,
    Amount: -120.0
  },
  {
    Description: 'Поповнення рахунку',
    TransactionID: 'TXN0005',
    Type: 4,
    Card: 12344321,
    Date: 1716067200000,
    Amount: 1000.0
  },
  {
    Description: 'Покупка на маркетплейсі',
    TransactionID: 'TXN0006',
    Type: 1,
    Card: 99887766,
    Date: 1716153600000,
    Amount: -340.99
  },
  {
    Description: 'Кешбек',
    TransactionID: 'TXN0007',
    Type: 5,
    Card: 55667788,
    Date: 1716240000000,
    Amount: 20.0
  },
  {
    Description: 'Оплата таксі',
    TransactionID: 'TXN0008',
    Type: 1,
    Card: 66554433,
    Date: 1716326400000,
    Amount: -85.25
  },
  {
    Description: 'Нарахування заробітної плати',
    TransactionID: 'TXN0009',
    Type: 6,
    Card: 11112222,
    Date: 1716412800000,
    Amount: 1500.0
  },
  {
    Description: 'Переказ на інший рахунок',
    TransactionID: 'TXN0010',
    Type: 2,
    Card: 22221111,
    Date: 1716499200000,
    Amount: -600.0
  }
];

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor() {}

  public getTransaction(): Observable<TransactionItem[]> {
    return of(transactions);
  }
}
