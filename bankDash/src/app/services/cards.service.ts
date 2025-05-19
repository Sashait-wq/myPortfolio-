import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Card } from '../interfaces/card.interface';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  constructor() {}

  public getAllCArd(): Observable<Card[]> {
    return of([
      {
        Balance: 1520.45,
        cardHolder: 'Іван Петренко',
        validThru: 202608,
        numberCard: 4111111111111111,
        typeCard: 'Visa'
      },
      {
        Balance: 239.1,
        cardHolder: 'Олена Коваленко',
        validThru: 202512,
        numberCard: 5500000000000004,
        typeCard: 'MasterCard'
      },
      {
        Balance: 5780.0,
        cardHolder: 'Андрій Шевченко',
        validThru: 202711,
        numberCard: 4000000000000002,
        typeCard: 'Visa'
      }
    ]);
  }
}

// 1 Створити pipe для обрізання номеру карти зробити 3 можливості обрізання .
// 2 Дописати transaction
// 3 Розібрати біліотику
