import { Component, inject, Input } from '@angular/core';
import { Card } from '../../interfaces/card.interface';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { creditCardLoading } from '../../store/credit-card/credit-card.selectors';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { AsyncPipe, DatePipe } from '@angular/common';
import { CardMaskPipe } from '../../pipes/card-mask.pipe';

@Component({
  selector: 'app-card-item',
  imports: [NgxSkeletonLoaderComponent, AsyncPipe, CardMaskPipe, DatePipe],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss'
})
export class CardItemComponent {
  private store = inject(Store);
  @Input() creditCard!: Card;

  loader: Observable<boolean> = this.store.select(creditCardLoading);
}
