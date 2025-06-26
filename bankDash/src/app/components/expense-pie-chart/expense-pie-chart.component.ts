import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ExpenseStat } from '../../page/dashboard/dashboard.interface';
import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'app-expense-pie-chart',
  imports: [ChartComponent],
  templateUrl: './expense-pie-chart.component.html',
  styleUrl: './expense-pie-chart.component.scss'
})
export class ExpensePieChartComponent implements OnChanges, AfterViewInit {
  @Input() data: ExpenseStat[] = [];
  @ViewChild('chartRef') chartRef!: ChartComponent;

  series: ApexNonAxisChartSeries = [];
  labels: string[] = [];

  chart: ApexChart = {
    type: 'pie',
    width: '350',
    height: 350,
    toolbar: { show: false },
    animations: {
      enabled: true,
      speed: 600
    }
  };

  colors: string[] = ['#2A305F', '#FF9800', '#FF00FF', '#1A23FF'];

  dataLabels: ApexDataLabels = {
    enabled: true,
    formatter: (val: number, opts) => {
      const label = opts.w.globals.labels[opts.seriesIndex];
      return `${Math.round(val)}%\n${label}`;
    },
    style: {
      fontSize: '17px',
      fontWeight: 'bold',
      colors: ['#fff']
    }
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data?.length && this.chartRef) {
      this.updateChart();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.data?.length) {
        this.updateChart();
      }
    });
  }

  updateChart(): void {
    this.series = this.data.map((d) => d.percent);
    this.labels = this.data.map((d) => d.category);

    this.chartRef.updateOptions(
      {
        series: this.series,
        labels: this.labels
      },
      true,
      true
    );
  }
}
