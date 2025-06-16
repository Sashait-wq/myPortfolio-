import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  transactionLoadError,
  transactionsLoad,
  transactionsLoadSuccess
} from './transactions.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { TransactionService } from '../../request-service/transaction.service';

@Injectable()
export class transactionsEffect {
  private service = inject(TransactionService);
  private action = inject(Actions);

  loadTransactionsEffect$ = createEffect(() =>
    this.action.pipe(
      ofType(transactionsLoad),
      switchMap(() =>
        this.service.getTransaction().pipe(
          map((response) => {
            return transactionsLoadSuccess({
              transactions: response.transactions,
              summary: response.summary
            });
          }),
          catchError((error) => {
            return of(transactionLoadError({ error }));
          })
        )
      )
    )
  );
}
