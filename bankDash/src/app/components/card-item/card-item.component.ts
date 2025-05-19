import { Component, Input } from '@angular/core';
import { Card } from '../../interfaces/card.interface';

@Component({
  selector: 'app-card-item',
  imports: [],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss'
})
export class CardItemComponent {
  @Input() data: Card | undefined;
}
