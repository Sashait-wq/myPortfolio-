import { createReducer, on } from '@ngrx/store';
import { Card } from '../../interfaces/card.interface';
import { creditCardError, creditCardLoad, creditCardSuccess } from './credit-card.action';

export interface creditCardState {
  card: Card[];
  error: any;
  loading: boolean;
}

const initialState: creditCardState = {
  card: [],
  error: null,
  loading: false
};

export const creditCardReducer = createReducer(
  initialState,
  on(creditCardLoad, (state) => ({
    ...state,
    loading: true
  })),
  on(creditCardSuccess, (state, { card }) => ({
    ...state,
    card,
    loading: false
  })),
  on(creditCardError, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
