import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Activity {
    id: number;
    user: string;
    avatar: string;
    avatarColor: string;
    action: string;
    highlight?: string;
    highlightColor?: string;
    detail?: string;
    detailBadge?: string;
    time: string;
    status?: string;
    statusColor?: string;
}

@Component({
    selector: 'app-recent-activity',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './recent-activity.component.html',
})
export class RecentActivityComponent {
    activities: Activity[] = [
        {
            id: 1,
            user: 'Sarah Jenkins',
            avatar: 'SJ',
            avatarColor: 'bg-cyan-500',
            action: 'created a new task',
            highlight: '"Q3 Frontend Audit"',
            highlightColor: 'text-cyan-400',
            detail: 'Project: Dashboard Redesign',
            time: '15 mins ago',
        },
        {
            id: 2,
            user: 'Michael Chen',
            avatar: 'MC',
            avatarColor: 'bg-orange-500',
            action: 'updated status to',
            highlight: 'In Progress',
            highlightColor: 'text-green-400',
            detailBadge: 'Task: Fix sidebar navigation bug on mobile',
            time: '42 mins ago',
        },
        {
            id: 3,
            user: 'Elena Page',
            avatar: 'EP',
            avatarColor: 'bg-pink-500',
            action: 'submitted a performance evaluation',
            detail: 'Target:',
            detailBadge: 'Marcus Thorne',
            time: '2 hours ago',
        },
        {
            id: 4,
            user: 'Robert Fox',
            avatar: 'RF',
            avatarColor: 'bg-purple-500',
            action: 'submitted Daily Report',
            status: 'Submitted on time',
            statusColor: 'text-green-400',
            time: '3 hours ago',
        },
    ];
}
