import { createAction, props } from '@ngrx/store';
import { Card } from '../../interfaces/card.interface';

export enum creditCardTypes {
  cardLoad = '[Credit Card] Load',
  cardLoadSuccess = '[Credit Card] Load Success',
  cardLoadFailure = '[Credit Card] Load Failure'
}

export const creditCardLoad = createAction(creditCardTypes.cardLoad);

export const creditCardSuccess = createAction(
  creditCardTypes.cardLoadSuccess,
  props<{ card: Card[] }>()
);

export const creditCardError = createAction(
  creditCardTypes.cardLoadFailure,
  props<{ error: any }>()
);
