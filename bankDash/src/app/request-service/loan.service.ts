import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable, of } from 'rxjs';
import { Loan, Summary } from '../interfaces/loan.interface';

export interface LoanInformation {
  personal: number;
  corporate: number;
  business: number;
  custom: string;
}
@Injectable({
  providedIn: 'root'
})
export class LoanService extends BaseService {
  public getLoan(): Observable<{ summary: Summary; loans: Loan[] }> {
    return this.get('loans', { userId: '1748540818058' });
  }

  public loanBaseInfo(): Observable<LoanInformation> {
    return of({
      personal: 100,
      corporate: 500,
      business: 300,
      custom: 'Choose Money'
    });
  }
}
