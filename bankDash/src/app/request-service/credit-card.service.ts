import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { delay, Observable, of } from 'rxjs';
import { Card } from '../interfaces/card.interface';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService extends BaseService {
  public getCreditCard(): Observable<Card[]> {
    const cards: Card[] = [
      {
        cardType: 'Classic',
        nameOnCard: 'ІВАН ІВАНОВ',
        cardNumber: '1234567890121234',
        expirationDate: '01/25',
        balance: '12333'
      },
      {
        cardType: 'Classic',
        nameOnCard: 'ІВАН ІВАНОВ',
        cardNumber: '1234567890121234',
        expirationDate: '01/25',
        balance: '12333'
      },
      {
        cardType: 'Classic',
        nameOnCard: 'ІВАН ІВАНОВ',
        cardNumber: '1234567890121234',
        expirationDate: '01/25',
        balance: '12333'
      }
    ];
    return of(cards).pipe(delay(3000));
  }
}
