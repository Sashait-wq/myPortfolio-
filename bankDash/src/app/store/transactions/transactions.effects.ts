import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { transactionsLoad, transactionsLoadSuccess } from './transactions.action';
import { map, switchMap } from 'rxjs';
import { TransactionService } from '../../services/transaction.service';

@Injectable()
export class transactionsEffect {
  private service = inject(TransactionService);
  private action = inject(Actions);

  transactionsLoadEffect$ = createEffect(() =>
    this.action.pipe(
      ofType(transactionsLoad),
      switchMap(() =>
        this.service.getTransaction().pipe(
          map((transaction) => {
            return transactionsLoadSuccess({ data: transaction });
          })
        )
      )
    )
  );
}
