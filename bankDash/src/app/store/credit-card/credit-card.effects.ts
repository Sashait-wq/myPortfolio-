import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { creditCardLoad, creditCardSuccess } from './credit-card.action';
import { CreditCardService } from '../../request-service/credit-card.service';

@Injectable()
export class CreditCardEffects {
  private service = inject(CreditCardService);
  private action = inject(Actions);

  creditCard$ = createEffect(() =>
    this.action.pipe(
      ofType(creditCardLoad),
      switchMap(() =>
        this.service.getCreditCard().pipe(
          map((card) => {
            return creditCardSuccess({ card });
          })
        )
      )
    )
  );
}
