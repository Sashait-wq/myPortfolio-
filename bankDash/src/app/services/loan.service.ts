import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Loan, Total } from '../interfaces/loan.interface';

const ELEMENT_DATA: Loan[] = [
  {
    'SL No': 1,
    'Loan Money': 'Hydrogen',
    'Left to repay': 1.0079,
    Duration: 'H',
    'Interest rate': 1,
    Installment: 1,
    Repay: 2
  },
  {
    'SL No': 2,
    'Loan Money': 'Helium',
    'Left to repay': 4.0026,
    Duration: 'He',
    'Interest rate': 1,
    Installment: 1,
    Repay: 2
  },
  {
    'SL No': 3,
    'Loan Money': 'Lithium',
    'Left to repay': 6.941,
    Duration: 'Li',
    'Interest rate': 1,
    Installment: 1,
    Repay: 2
  },
  {
    'SL No': 4,
    'Loan Money': 'Beryllium',
    'Left to repay': 9.0122,
    Duration: 'Be',
    'Interest rate': 1,
    Installment: 1,
    Repay: 2
  },
  {
    'SL No': 5,
    'Loan Money': 'Boron',
    'Left to repay': 10.811,
    Duration: 'B',
    'Interest rate': 1,
    Installment: 1,
    Repay: 2
  },
  {
    'SL No': 6,
    'Loan Money': 'Carbon',
    'Left to repay': 12.0107,
    Duration: 'C',
    'Interest rate': 1,
    Installment: 1,
    Repay: 2
  },
  {
    'SL No': 7,
    'Loan Money': 'Nitrogen',
    'Left to repay': 14.0067,
    Duration: 'N',
    'Interest rate': 1,
    Installment: 1,
    Repay: 2
  },
  {
    'SL No': 8,
    'Loan Money': 'Oxygen',
    'Left to repay': 15.9994,
    Duration: 'O',
    'Interest rate': 1,
    Installment: 1,
    Repay: 2
  },
  {
    'SL No': 9,
    'Loan Money': 'Fluorine',
    'Left to repay': 18.9984,
    Duration: 'F',
    'Interest rate': 1,
    Installment: 1,
    Repay: 2
  },
  {
    'SL No': 10,
    'Loan Money': 'Neon',
    'Left to repay': 20.1797,
    Duration: 'Ne',
    'Interest rate': 1,
    Installment: 1,
    Repay: 2
  }
];

const total: Total = { loan: 121312412, repay: 1211, month: 'AWdawdsad12w' };

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  constructor() {}

  getLoans(): Observable<{ total: Total; data: Loan[] }> {
    return of({ total: total, data: ELEMENT_DATA });
  }
}

// 1. Створити фейкові дані, 30% помилка даних, а 70% не має помилки
