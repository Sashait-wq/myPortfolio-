import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { createCreditCard, creditCardLoad } from '../../store/credit-card/credit-card.action';
import { creditCardSelector } from '../../store/credit-card/credit-card.selectors';
import { Card, CardType, CreditCard, CreditCardForm } from '../../interfaces/card.interface';
import { ApexChart, ApexLegend, ApexNonAxisChartSeries, NgApexchartsModule } from 'ng-apexcharts';
import { NgForOf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CardsComponent } from '../../components/cards/cards.component';

@Component({
  selector: 'app-credit-cards',
  imports: [
    NgApexchartsModule,
    NgForOf,
    MatButton,
    MatFormFieldModule,
    MatInput,
    ReactiveFormsModule,
    MatSelectModule,
    CardsComponent
  ],
  templateUrl: './credit-cards.component.html',
  styleUrl: './credit-cards.component.scss'
})
export class CreditCardsComponent implements OnInit {
  private store = inject(Store);

  public creditCards: Card[] = [];
  ngOnInit(): void {
    this.store.dispatch(creditCardLoad());

    this.store.select(creditCardSelector).subscribe((cards) => {
      this.creditCards = cards;
    });
  }

  public series: ApexNonAxisChartSeries = [40, 30, 20, 30];

  public chart: ApexChart = {
    type: 'donut',
    width: 141
  };

  public labels: string[] = ['DBL Bank', 'BRC Bank', 'ABM Bank', 'MCP Bank'];
  public colors: string[] = ['#4c78ff', '#ff82ac', '#16dbcc', '#ffbb38'];
  public legend: ApexLegend = {
    show: false
  };

  public cardTypeOptions: { value: CardType; label: string }[] = [
    { value: 'Primary', label: 'Primary' },
    { value: 'Secondary', label: 'Secondary' },
    { value: 'Virtual', label: 'Virtual' },
    { value: 'Prepaid', label: 'Prepaid' },
    { value: 'Business', label: 'Business' },
    { value: 'Student', label: 'Student' }
  ];

  public form: FormGroup<CreditCardForm> = new FormGroup<CreditCardForm>({
    cardType: new FormControl<CardType>('Primary', Validators.required),
    nameOnCard: new FormControl(null, [Validators.required]),
    cardNumber: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{16}$/)]),
    expirationDate: new FormControl(null, [Validators.required])
  });

  public submit(): void {
    const card = this.form.value as CreditCard;
    this.store.dispatch(createCreditCard({ card }));
  }
}
