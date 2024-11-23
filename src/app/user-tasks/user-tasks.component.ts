import {Component, Input, input} from '@angular/core';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  standalone: true,
  styleUrl: './user-tasks.component.css'
})
export class UserTasksComponent {
  @Input() name?: string;



}
