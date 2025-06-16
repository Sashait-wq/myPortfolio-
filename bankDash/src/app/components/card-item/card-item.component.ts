import { Component, inject, Input, OnInit } from '@angular/core';
import { Card } from '../../interfaces/card.interface';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { creditCardLoading } from '../../store/credit-card/credit-card.selectors';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { AsyncPipe } from '@angular/common';
import { CardMaskPipe } from '../../pipes/card-mask.pipe';

@Component({
  selector: 'app-card-item',
  imports: [NgxSkeletonLoaderComponent, AsyncPipe, CardMaskPipe],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss'
})
export class CardItemComponent implements OnInit {
  private store = inject(Store);
  @Input() card!: Card;

  loader: Observable<boolean> = this.store.select(creditCardLoading);

  ngOnInit(): void {}
}
