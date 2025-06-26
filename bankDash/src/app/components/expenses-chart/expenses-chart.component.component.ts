import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexPlotOptions,
  ApexTooltip,
  ApexXAxis,
  NgApexchartsModule
} from 'ng-apexcharts';
import { NgIf } from '@angular/common';

export type MonthlyExpense = {
  month: string;
  amount: number;
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  colors: string[];
};

@Component({
  selector: 'app-expenses-chart',
  standalone: true,
  imports: [NgApexchartsModule, NgIf],
  templateUrl: './expenses-chart.component.component.html',
  styleUrl: './expenses-chart.component.component.scss'
})
export class ExpensesChartComponent implements OnChanges {
  @Input() transactions: any[] = [];
  public chartOptions: ChartOptions | null = null;
  private readonly monthsOrder = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactions']) {
      this.updateChart();
    }
  }

  private updateChart(): void {
    if (!this.transactions || this.transactions.length === 0) {
      this.chartOptions = null;
      return;
    }

    const expenses = this.transactions.filter(
      (t) => t.type === 'expense' && t.amount < 0 && this.isValidDate(t.date)
    );

    const monthlyData = this.groupByMonth(expenses);
    const values = monthlyData.map((e) => +e.amount.toFixed(2));

    this.chartOptions = {
      series: [
        {
          name: 'Expenses',
          data: values
        }
      ],
      chart: {
        type: 'bar',
        height: 180,
        width: '330',
        toolbar: { show: false },
        animations: {
          enabled: true,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 800
          }
        }
      },
      xaxis: {
        categories: this.monthsOrder,
        labels: {
          style: {
            colors: '#94a3b8',
            fontWeight: 500
          }
        },
        axisBorder: { show: false },
        axisTicks: { show: false }
      },
      plotOptions: {
        bar: {
          borderRadius: 8,
          columnWidth: '45%'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: (val: number) => `$${val.toLocaleString()}`
        }
      },
      dataLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold'
        },
        formatter: (val: number) => `$${val.toLocaleString()}`,
        offsetY: -10
      },
      colors: ['#16dbcc', '#16dbcc']
    };
  }

  private isValidDate(date: any): boolean {
    try {
      return !isNaN(new Date(date).getTime());
    } catch {
      return false;
    }
  }

  private groupByMonth(expenses: any[]): MonthlyExpense[] {
    const monthlyData: { [key: string]: number } = {};

    expenses.forEach((expense) => {
      const date = new Date(expense.date);
      const month = date.toLocaleString('en-US', { month: 'short' });
      monthlyData[month] = (monthlyData[month] || 0) + Math.abs(expense.amount);
    });

    return this.monthsOrder.map((month) => ({
      month,
      amount: monthlyData[month] || 0
    }));
  }
}
