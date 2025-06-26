import { FormControl } from '@angular/forms';

export interface Card {
  id: string;
  cardType: string;
  nameOnCard: string;
  cardNumber: string;
  expirationDate: string;
  balance: string;
}

export type CardType = 'Primary' | 'Secondary' | 'Virtual' | 'Prepaid' | 'Business' | 'Student';

export interface CreditCardForm {
  cardType: FormControl<CardType | null>;
  nameOnCard: FormControl<string | null>;
  cardNumber: FormControl<string | null>;
  expirationDate: FormControl<string | null>;
}

export interface CreditCard {
  cardType: string;
  nameOnCard: string;
  cardNumber: string;
  expirationDate: string;
}
