import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService, SelectItem } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-task-list',
  imports: [
    TableModule,
    FormsModule,
    CommonModule,
    ToastModule,
    TagModule,
    SelectModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  tasks!: Task[];

  statuses!: SelectItem[];

  clonedProducts: { [s: string]: Task } = {};

  constructor(private tasksService: TaskService, private messageService: MessageService) {
  }

  ngOnInit() {
    this.tasksService.getAllTasks().subscribe((data) => {
      this.tasks = data;
    });

    this.statuses = [
      { label: 'In Progess', value: 'INPROGRESS' },
      { label: 'Done', value: 'DONE' },
    ];
  }

  onRowEditInit(task: Task) {
    this.clonedProducts[task.id] = { ...task };
  }

  onRowEditSave(task: Task) {

  }

  onRowEditCancel(task: Task, index: number) {
    this.tasks[index] = this.clonedProducts[task.id];
    delete this.clonedProducts[task.id];
  }

  getSeverity(status: string) {
    switch (status) {
      case 'DONE':
        return 'success';
      case 'INPROGRESS':
        return 'warn';
      default:
        return 'info';
    }
  }
}
