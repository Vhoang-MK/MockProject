import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
    selector: 'app-evaluation-progress-chart',
    standalone: true,
    imports: [CommonModule, NgApexchartsModule],
    templateUrl: './evaluation-progress-chart.component.html',
})
export class EvaluationProgressChartComponent {
    public chartOptions: any;
    selectedPeriod: string = 'Monthly';

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: 'Completion Rate',
                    data: [30, 45, 35, 50, 65, 75],
                },
            ],
            chart: {
                type: 'area',
                height: 200,
                background: 'transparent',
                toolbar: {
                    show: false,
                },
                sparkline: {
                    enabled: false,
                },
            },
            colors: ['#22C55E'],
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.4,
                    opacityTo: 0.1,
                    stops: [0, 90, 100],
                },
            },
            dataLabels: {
                enabled: false,
            },
            xaxis: {
                categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'],
                labels: {
                    style: {
                        colors: '#9CA3AF',
                        fontSize: '12px',
                    },
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
            },
            yaxis: {
                show: false,
            },
            grid: {
                show: false,
            },
            tooltip: {
                theme: 'dark',
                y: {
                    formatter: function (val: number) {
                        return val + '%';
                    },
                },
            },
        };
    }
}
