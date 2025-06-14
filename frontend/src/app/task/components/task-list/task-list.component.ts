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
  clonedTasks: { [s: string]: Task } = {};

  constructor(private tasksService: TaskService, private messageService: MessageService) {
  }

  ngOnInit() {
    this.tasksService.getAllTasks().subscribe((data) => {
      this.tasks = data;
    });

    this.statuses = [
      { label: 'Pendente', value: false },
      { label: 'Concluída', value: true }
    ];
  }

  onRowEditInit(task: Task) {
    this.clonedTasks[task.id.toString()] = { ...task };
  }

  onRowEditSave(task: Task) {
    if (task.title && task.title.trim()) {
      this.tasksService.updateTask(task.id, {
        title: task.title,
        description: task.description,
        completed: task.completed
      }).subscribe({
        next: (updatedTask) => {
          const index = this.tasks.findIndex(t => t.id === task.id);
          if (index !== -1) {
            this.tasks[index] = updatedTask;
          }
          
          delete this.clonedTasks[task.id.toString()];
          
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Tarefa atualizada com sucesso'
          });
        },
        error: (error) => {
          console.error('Erro ao atualizar tarefa:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao atualizar a tarefa'
          });
        }
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Título é obrigatório'
      });
    }
  }

  onRowEditCancel(task: Task, index: number) {
    this.tasks[index] = this.clonedTasks[task.id.toString()];
    delete this.clonedTasks[task.id.toString()];
  }

  getSeverity(completed: boolean): string {
    return completed ? 'success' : 'warn';
  }

  getStatusLabel(completed: boolean): string {
    return completed ? 'Concluída' : 'Pendente';
  }
}