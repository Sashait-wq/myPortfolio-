import { inject, Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { Loan, Summary } from '../store/loan/loan.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoanService extends BaseService {
  private httpLoan = inject(HttpClient);

  public getLoan(): Observable<{ total: Summary; data: Loan[] }> {
    return this.httpLoan.get<{ total: Summary; data: Loan[] }>('loans');
  }
}
