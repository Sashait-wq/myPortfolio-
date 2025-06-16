import { Component, inject, OnInit } from '@angular/core';
import { CardItemComponent } from '../../components/card-item/card-item.component';
import { Store } from '@ngrx/store';
import { creditCardLoad } from '../../store/credit-card/credit-card.action';
import { creditCardSelector } from '../../store/credit-card/credit-card.selectors';
import { Card } from '../../interfaces/card.interface';
import { ApexChart, ApexLegend, ApexNonAxisChartSeries, NgApexchartsModule } from 'ng-apexcharts';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-credit-cards',
  imports: [CardItemComponent, NgApexchartsModule, NgForOf],
  templateUrl: './credit-cards.component.html',
  styleUrl: './credit-cards.component.scss'
})
export class CreditCardsComponent implements OnInit {
  store = inject(Store);

  creditCards: Card[] = [];
  ngOnInit(): void {
    this.store.dispatch(creditCardLoad());

    this.store.select(creditCardSelector).subscribe((cards) => {
      this.creditCards = cards;
    });
  }

  public series: ApexNonAxisChartSeries = [40, 30, 20, 30];

  public chart: ApexChart = {
    type: 'donut',
    width: 205
  };

  public labels: string[] = ['DBL Bank', 'BRC Bank', 'ABM Bank', 'MCP Bank'];
  public colors: string[] = ['#4c78ff', '#ff82ac', '#16dbcc', '#ffbb38'];
  public legend: ApexLegend = {
    show: false
  };
}
