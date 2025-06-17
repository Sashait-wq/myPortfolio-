import { inject, Injectable } from '@angular/core';
import { LoanService } from '../../request-service/loan.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadLoan,
  loadLoanError,
  loadLoanInfo,
  loadLoanInfoError,
  loadLoanInfoSuccess,
  loadLoanSuccess
} from './loan.action';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class LoanEffects {
  private service = inject(LoanService);
  private action = inject(Actions);

  loadLoan$ = createEffect(() =>
    this.action.pipe(
      ofType(loadLoan),
      switchMap(() =>
        this.service.getLoan().pipe(
          map((loans) => {
            console.log('API response:', loans);
            return loadLoanSuccess({
              total: loans.summary,
              data: loans.loans
            });
          }),
          catchError((error) => {
            return of(loadLoanError({ error }));
          })
        )
      )
    )
  );

  loadLoanInfo$ = createEffect(() =>
    this.action.pipe(
      ofType(loadLoanInfo),
      switchMap(() =>
        this.service.loanBaseInfo().pipe(
          map((loanInfo) => {
            return loadLoanInfoSuccess({ loanInfo });
          }),
          catchError((error) => {
            return of(loadLoanInfoError({ error }));
          })
        )
      )
    )
  );
}
