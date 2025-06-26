import { createAction, props } from '@ngrx/store';
import { Card, CreditCard } from '../../interfaces/card.interface';

export enum creditCardTypes {
  Load = '[Credit Card] Load',
  LoadSuccess = '[Credit Card] Load Success',
  LoadFailure = '[Credit Card] Load Failure',

  Create = '[Credit Card] Create',
  CreateSuccess = '[Credit Card] Create Success',
  CreateFailure = '[Credit Card] Create Failure'
}

export const createCreditCard = createAction(creditCardTypes.Create, props<{ card: CreditCard }>());

export const createCreditCardSuccess = createAction(
  creditCardTypes.CreateSuccess,
  props<{ card: CreditCard }>()
);

export const createCreditCardFailure = createAction(
  creditCardTypes.CreateFailure,
  props<{ error: any }>()
);

export const creditCardLoad = createAction(creditCardTypes.Load);

export const creditCardSuccess = createAction(
  creditCardTypes.LoadSuccess,
  props<{ card: Card[] }>()
);

export const creditCardFailure = createAction(creditCardTypes.LoadFailure, props<{ error: any }>());
