import { Component, Input } from '@angular/core';
import { CardItemComponent } from '../card-item/card-item.component';
import { Card } from '../../interfaces/card.interface';

@Component({
  selector: 'app-cards',
  imports: [CardItemComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  @Input() cards: Card[] = [];
}
