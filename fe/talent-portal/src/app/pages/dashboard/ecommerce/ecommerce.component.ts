import { Component } from '@angular/core';
import { EcommerceMetricsComponent } from '../../../shared/components/ecommerce/ecommerce-metrics/ecommerce-metrics.component';
import { TaskStatusChartComponent } from '../../../shared/components/ecommerce/task-status-chart/task-status-chart.component';
import { EvaluationProgressChartComponent } from '../../../shared/components/ecommerce/evaluation-progress-chart/evaluation-progress-chart.component';
import { RecentActivityComponent } from '../../../shared/components/ecommerce/recent-activity/recent-activity.component';
import { QuickActionsComponent } from '../../../shared/components/ecommerce/quick-actions/quick-actions.component';
import { UpcomingDeadlinesComponent } from '../../../shared/components/ecommerce/upcoming-deadlines/upcoming-deadlines.component';

@Component({
  selector: 'app-ecommerce',
  imports: [
    EcommerceMetricsComponent,
    TaskStatusChartComponent,
    EvaluationProgressChartComponent,
    RecentActivityComponent,
    QuickActionsComponent,
    UpcomingDeadlinesComponent,
  ],
  templateUrl: './ecommerce.component.html',
})
export class EcommerceComponent { }
