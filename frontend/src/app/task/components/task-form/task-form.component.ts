import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { TaskService } from '../../services/task.service';
import { Task, CreateTaskInput } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputTextarea,
    CheckboxModule
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  @Output() taskCreated = new EventEmitter<Task>();
  @Output() cancelled = new EventEmitter<void>();

  taskForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
      description: [''],
      completed: [false]
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.isSubmitting = true;
      
      const formValue = this.taskForm.value;
      const taskData: CreateTaskInput = {
        title: formValue.title.trim(),
        description: formValue.description?.trim() || '',
        completed: formValue.completed
      };

      this.taskService.createTask(taskData).subscribe({
        next: (createdTask) => {
          this.taskCreated.emit(createdTask);
          this.resetForm();
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Erro ao criar tarefa:', error);
          this.isSubmitting = false;
        }
      });
    } else {
      Object.keys(this.taskForm.controls).forEach(key => {
        this.taskForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel() {
    this.resetForm();
    this.cancelled.emit();
  }

  private resetForm() {
    this.taskForm.reset({
      title: '',
      description: '',
      completed: false
    });
  }
}