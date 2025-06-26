import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { WeeklyActivity } from '../../page/dashboard/dashboard.interface';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexLegend,
  ApexPlotOptions,
  ApexXAxis,
  ChartComponent
} from 'ng-apexcharts';

@Component({
  selector: 'app-weekly-transaction-chart',
  imports: [ChartComponent],
  templateUrl: './weekly-transaction-chart.component.html',
  styleUrl: './weekly-transaction-chart.component.scss'
})
export class WeeklyTransactionChartComponent implements OnChanges {
  @Input() data!: WeeklyActivity;
  @ViewChild('chartRef') chartRef!: ChartComponent;
  public days: string[] = [];
  public deposit: number[] = [];
  public withdraw: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.updateChart();
    }
  }

  public chart: ApexChart = {
    type: 'bar',
    height: 300,
    width: '662',
    toolbar: {
      show: false
    }
  };

  public colors = ['#00BCD4', '#1A237E'];

  public plotOptions: ApexPlotOptions = {
    bar: {
      horizontal: false,
      columnWidth: '40%',
      borderRadius: 10
    }
  };

  public dataLabels: ApexDataLabels = {
    enabled: false
  };

  public legend: ApexLegend = {
    position: 'top',
    horizontalAlign: 'right'
  };

  public xaxis: ApexXAxis = {
    categories: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  };

  public series: ApexAxisChartSeries = [];

  updateChart() {
    this.days = this.data.days;
    this.deposit = this.data.deposit;
    this.withdraw = this.data.withdraw;

    const updatedSeries: ApexAxisChartSeries = [
      { name: 'Deposit', data: this.deposit },
      { name: 'Withdraw', data: this.withdraw }
    ];

    this.series = updatedSeries;
    this.xaxis = { categories: this.days };

    if (this.chartRef) {
      this.chartRef.updateOptions(
        {
          series: this.series,
          xaxis: this.xaxis
        },
        true,
        true
      );
    }
  }
}
