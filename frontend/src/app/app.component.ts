import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DragDropModule } from 'primeng/dragdrop';
import { TaskListComponent } from "./task/components/task-list/task-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, DragDropModule, CommonModule, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
   title = 'Task Management App';
}
