import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { BalanceHistory } from '../../page/dashboard/dashboard.interface';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexGrid,
  ApexStroke,
  ApexXAxis,
  ChartComponent
} from 'ng-apexcharts';

@Component({
  selector: 'app-balance-history-chart',
  imports: [ChartComponent],
  templateUrl: './balance-history-chart.component.html',
  styleUrl: './balance-history-chart.component.scss'
})
export class BalanceHistoryChartComponent implements OnChanges, AfterViewInit {
  @Input() data: BalanceHistory[] = [];
  @ViewChild('chartRef') chartRef!: ChartComponent;

  series: ApexAxisChartSeries = [];
  chart: ApexChart = {
    type: 'area',
    height: 230,
    width: 635,
    toolbar: { show: false },
    animations: {
      enabled: true,
      speed: 600
    }
  };

  colors = ['#1A23FF'];

  stroke: ApexStroke = {
    curve: 'smooth',
    width: 3
  };

  fill: ApexFill = {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0,
      stops: [0, 100]
    }
  };

  xaxis: ApexXAxis = {
    categories: [],
    labels: { style: { colors: '#9E9E9E' } }
  };

  grid: ApexGrid = {
    show: true,
    borderColor: '#E0E0E0',
    strokeDashArray: 4
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data?.length) {
      console.log('CHANGES: DATA:', this.data);
      this.updateChart();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.data?.length) {
        console.log('AFTER INIT:', this.data);
        this.updateChart();
      }
    });
  }

  updateChart(): void {
    this.series = [
      {
        name: 'Balance',
        data: this.data.map((d) => d.balance)
      }
    ];

    this.xaxis = {
      ...this.xaxis,
      categories: this.data.map((d) => d.month)
    };

    if (this.chartRef?.updateOptions) {
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
