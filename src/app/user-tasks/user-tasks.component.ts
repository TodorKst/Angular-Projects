import {Component, EventEmitter, Input, input, Output} from '@angular/core';
import {TaskComponent} from './task/task.component';
import {AddTaskComponent} from './add-task/add-task.component';
import {newTaskData} from './task/task.model';
import {TaskService} from './task.service';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  standalone: true,
  styleUrl: './user-tasks.component.css',
  imports: [TaskComponent, AddTaskComponent]
})
export class UserTasksComponent {
  @Input() name!: string;
  @Input() userId!: string;
  isAddingTask = false;

  constructor(private taskService: TaskService) {}


  get selectedUserTasks() {
    return this.taskService.getUserTasks(this.userId);
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCloseAddTask() {
    this.isAddingTask = false;
  }

}
