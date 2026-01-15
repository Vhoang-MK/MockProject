import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
    selector: 'app-task-status-chart',
    standalone: true,
    imports: [CommonModule, NgApexchartsModule],
    templateUrl: './task-status-chart.component.html',
})
export class TaskStatusChartComponent {
    public chartOptions: any;

    constructor() {
        this.chartOptions = {
            series: [25, 35, 30, 10],
            chart: {
                type: 'donut',
                height: 280,
                background: 'transparent',
            },
            labels: ['To Do', 'In Progress', 'Done', 'Blocked'],
            colors: ['#6B7280', '#22D3EE', '#22C55E', '#EF4444'],
            plotOptions: {
                pie: {
                    donut: {
                        size: '70%',
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: '14px',
                                color: '#9CA3AF',
                                offsetY: -10,
                            },
                            value: {
                                show: true,
                                fontSize: '24px',
                                fontWeight: 700,
                                color: '#FFFFFF',
                                offsetY: 10,
                                formatter: function () {
                                    return 'Tasks';
                                },
                            },
                            total: {
                                show: true,
                                label: 'Total',
                                fontSize: '14px',
                                color: '#9CA3AF',
                                formatter: function () {
                                    return 'Tasks';
                                },
                            },
                        },
                    },
                },
            },
            legend: {
                show: true,
                position: 'bottom',
                horizontalAlign: 'center',
                labels: {
                    colors: '#9CA3AF',
                },
                markers: {
                    size: 8,
                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 5,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: false,
            },
        };
    }
}
