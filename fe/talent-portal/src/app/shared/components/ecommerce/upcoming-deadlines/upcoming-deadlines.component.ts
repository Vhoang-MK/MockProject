import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Deadline {
    id: number;
    taskName: string;
    projectName: string;
    assignedUser: string;
    userAvatar: string;
    dueDate: string;
    status: string;
    statusColor: string;
    statusBgColor: string;
}

@Component({
    selector: 'app-upcoming-deadlines',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './upcoming-deadlines.component.html',
})
export class UpcomingDeadlinesComponent {
    deadlines: Deadline[] = [
        {
            id: 1,
            taskName: 'API Integration Review',
            projectName: 'Project: Mobile App',
            assignedUser: 'Marcus Thorne',
            userAvatar: 'MT',
            dueDate: 'Today, 5:00 PM',
            status: 'PENDING REVIEW',
            statusColor: 'text-orange-500',
            statusBgColor: 'bg-orange-500/10',
        },
        {
            id: 2,
            taskName: 'UX Evaluation: Phase 1',
            projectName: 'Eval Round Q3',
            assignedUser: 'Elena Page',
            userAvatar: 'EP',
            dueDate: 'Tomorrow, 10:00 AM',
            status: 'IN PROGRESS',
            statusColor: 'text-blue-500',
            statusBgColor: 'bg-blue-500/10',
        },
        {
            id: 3,
            taskName: 'Monthly User Report',
            projectName: 'Administrative',
            assignedUser: 'Alex Rivers (Me)',
            userAvatar: 'AR',
            dueDate: 'Friday, Jul 14',
            status: 'NOT STARTED',
            statusColor: 'text-gray-500',
            statusBgColor: 'bg-gray-500/10',
        },
    ];
}
