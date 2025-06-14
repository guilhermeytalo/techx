import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTaskInput, Task, UpdateTaskInput } from '../models/task.model';
import { environment } from '../../../environment/env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  createTask(data: CreateTaskInput): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, data);
  }

  updateTask(id: number, data: UpdateTaskInput): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, data);
  }

  deleteTask(id: number): Observable<Task> {
    return this.http.delete<Task>(`${this.apiUrl}/${id}`);
  }

  toggleTaskCompleted(id: number): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}/done`, {});
  }
}
