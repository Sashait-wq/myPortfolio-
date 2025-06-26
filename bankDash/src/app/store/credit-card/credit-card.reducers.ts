import { createReducer, on } from '@ngrx/store';
import { Card, CreditCard } from '../../interfaces/card.interface';
import {
  createCreditCard,
  createCreditCardFailure,
  createCreditCardSuccess,
  creditCardFailure,
  creditCardLoad,
  creditCardSuccess
} from './credit-card.action';

export interface CreditCardState {
  card: Card[];
  error: any;
  loading: boolean;
}

const initialStateCards: CreditCardState = {
  card: [],
  error: null,
  loading: false
};

export const creditCardReducer = createReducer(
  initialStateCards,

  on(creditCardLoad, (state) => ({
    ...state,
    error: null,
    loading: true
  })),
  on(creditCardSuccess, (state, { card }) => ({
    ...state,
    card,
    loading: false,
    error: null
  })),
  on(creditCardFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);

export interface CreateCreditCardState {
  card: CreditCard | null;
  error: any;
  loading: boolean;
}

const initialStateCard: CreateCreditCardState = {
  card: null,
  error: null,
  loading: false
};

export const createCreditCardReducer = createReducer(
  initialStateCard,
  on(createCreditCard, (state, { card }) => ({
    ...state,
    card,
    error: null,
    loading: true
  })),
  on(createCreditCardSuccess, (state, { card }) => ({
    ...state,
    card,
    error: null,
    loading: false
  })),
  on(createCreditCardFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
