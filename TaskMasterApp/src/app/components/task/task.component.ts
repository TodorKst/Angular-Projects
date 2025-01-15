import {Component, Input} from '@angular/core';
import {UserModel} from '../../models/user.model';
import {TaskModel} from '../../models/task.model';
import {DatePipe} from '@angular/common';
import {TaskService} from '../../services/task/task.service';

@Component({
  selector: 'app-task',
  imports: [
    DatePipe
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  standalone: true
})
export class TaskComponent {
  @Input() selectedUser: UserModel | null = null;
  @Input() selectedUserTasks: TaskModel[] = [];

  constructor(private taskService: TaskService) {
  }

  completeTask(id: number): void {
    this.taskService.deleteTask(id);
    this.selectedUserTasks = this.selectedUserTasks.filter(task => task.id !== id);
  }

  onStartAddTask(): void {
    console.log('Start adding task');
  }
}
