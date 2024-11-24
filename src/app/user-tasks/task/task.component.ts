import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from './task.model';
import {TaskService} from '../task.service';


@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})


export class TaskComponent {
  @Input({required: true}) task!: Task;
  @Output() complete = new EventEmitter<string>();

  constructor(private taskService: TaskService) {
  }

  onCompleteTask() {
    this.taskService.removeTask(this.task.id);
  }
}
