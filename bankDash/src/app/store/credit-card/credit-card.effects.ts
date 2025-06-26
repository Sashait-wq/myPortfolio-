import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import {
  createCreditCard,
  createCreditCardFailure,
  createCreditCardSuccess,
  creditCardFailure,
  creditCardLoad,
  creditCardSuccess
} from './credit-card.action';
import { CreditCardService } from '../../request-service/credit-card.service';

@Injectable()
export class CreditCardEffects {
  private service = inject(CreditCardService);
  private action = inject(Actions);

  creditCardEffect$ = createEffect(() =>
    this.action.pipe(
      ofType(creditCardLoad),
      switchMap(() =>
        this.service.getCreditCard().pipe(
          map((card) => {
            return creditCardSuccess({ card });
          }),
          catchError((error) => of(creditCardFailure({ error })))
        )
      )
    )
  );

  createCreditCardEffect$ = createEffect(() =>
    this.action.pipe(
      ofType(createCreditCard),
      switchMap(({ card }) =>
        this.service.creditCard(card).pipe(
          map((card) => {
            return createCreditCardSuccess({ card });
          }),
          catchError((error) => of(createCreditCardFailure({ error })))
        )
      )
    )
  );
}
