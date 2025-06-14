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
import { DialogModule } from 'primeng/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';

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
    InputTextModule,
    DialogModule,
    TaskFormComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  tasks!: Task[];
  statuses!: SelectItem[];
  clonedTasks: { [s: string]: Task } = {};
  displayTaskForm = false;

  constructor(private tasksService: TaskService, private messageService: MessageService) {
  }

  ngOnInit() {
    this.loadTasks();

    this.statuses = [
      { label: 'Pendente', value: false },
      { label: 'Concluída', value: true }
    ];
  }

  loadTasks() {
    this.tasksService.getAllTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  showTaskForm() {
    this.displayTaskForm = true;
  }

  onTaskCreated(task: Task) {
    this.tasks = [...this.tasks, task];
    this.displayTaskForm = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Tarefa criada com sucesso'
    });
  }

  onFormCancelled() {
    this.displayTaskForm = false;
  }

  deleteTask(task: Task) {
    this.tasksService.deleteTask(task.id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== task.id);
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Tarefa excluída com sucesso'
        });
      },
      error: (error) => {
        console.error('Erro ao excluir tarefa:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao excluir a tarefa'
        });
      }
    });
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