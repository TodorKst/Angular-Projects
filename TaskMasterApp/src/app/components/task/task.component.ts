import {Component, Input, signal} from '@angular/core';
import {UserModel} from '../../models/user.model';
import {TaskModel} from '../../models/task.model';
import {DatePipe} from '@angular/common';
import {TaskService} from '../../services/task/task.service';
import {NewTaskComponent} from '../new-task/new-task.component';

@Component({
  selector: 'app-task',
  imports: [
    DatePipe,
    NewTaskComponent
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  standalone: true
})
export class TaskComponent {
  @Input() selectedUser: UserModel | null = null;
  @Input() selectedUserTasks: TaskModel[] = [];
  isAddingTask = signal(false);

  constructor(private taskService: TaskService) {
  }

  completeTask(id: number): void {
    this.taskService.deleteTask(id);
    this.selectedUserTasks = this.selectedUserTasks.filter(task => task.id !== id);
  }

  onStartAddTask(): void {
    this.isAddingTask.set(true);
  }
}
