import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { Card, CreditCard } from '../interfaces/card.interface';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService extends BaseService {
  public getCreditCard(): Observable<Card[]> {
    return this.get('cards');
  }

  public creditCard(card: CreditCard): Observable<CreditCard> {
    return this.post('cards', card);
  }
}
