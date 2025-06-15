import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DragDropModule } from 'primeng/dragdrop';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, DragDropModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
   title = 'Task Management App';
}
