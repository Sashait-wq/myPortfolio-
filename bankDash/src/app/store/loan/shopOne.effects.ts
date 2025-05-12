import { inject, Injectable } from '@angular/core';
import { LoanService } from '../../services/loan.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadLoan, loadLoanSuccess } from './shopOne.action';
import { map, switchMap } from 'rxjs';

@Injectable()
export class LoanEffects {
  private service = inject(LoanService);
  private action = inject(Actions);

  loadLoan$ = createEffect(() =>
    this.action.pipe(
      ofType(loadLoan),
      switchMap(() =>
        this.service.getLoans().pipe(
          map((loans) => {
            debugger;
            return loadLoanSuccess(loans);
          })
        )
      )
    )
  );
}
