import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  availableTasks = [
    { title: 'Estudar Angular' },
    { title: 'Criar layout com PrimeNG' },
    { title: 'Testar drag and drop' },
  ];

  inProgressTasks: any[] = [];

  onDrop(event: any) {
    this.inProgressTasks.push(event.dragData);
    this.availableTasks = this.availableTasks.filter(
      (task) => task !== event.dragData
    );
  }
}
