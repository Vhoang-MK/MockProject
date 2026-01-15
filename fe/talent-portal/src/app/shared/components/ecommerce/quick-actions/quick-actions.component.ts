import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface QuickAction {
    id: number;
    label: string;
    icon: string;
    color: string;
    bgColor: string;
}

@Component({
    selector: 'app-quick-actions',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './quick-actions.component.html',
})
export class QuickActionsComponent {
    actions: QuickAction[] = [
        {
            id: 1,
            label: 'New User',
            icon: 'user-plus',
            color: 'text-gray-300',
            bgColor: 'bg-gray-800 hover:bg-gray-700',
        },
        {
            id: 2,
            label: 'New Project',
            icon: 'folder-plus',
            color: 'text-gray-300',
            bgColor: 'bg-gray-800 hover:bg-gray-700',
        },
        {
            id: 3,
            label: 'New Task',
            icon: 'clipboard-plus',
            color: 'text-gray-300',
            bgColor: 'bg-gray-800 hover:bg-gray-700',
        },
        {
            id: 4,
            label: 'New Eval Round',
            icon: 'play-circle',
            color: 'text-white',
            bgColor: 'bg-red-600 hover:bg-red-700',
        },
    ];
}
