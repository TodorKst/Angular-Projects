import {Component, input, Input, signal, WritableSignal} from '@angular/core';
import {TaskModel} from '../../models/task.model';
import {DatePipe, NgClass, TitleCasePipe} from '@angular/common';
import {TaskService} from '../../services/task/task.service';
import {UserModel} from '../../models/user.model';

@Component({
  selector: 'app-task',
  imports: [
    NgClass,
    TitleCasePipe,
    DatePipe
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  standalone: true
})
export class TaskComponent {

  @Input() task: TaskModel | null = null;
  @Input() selectedUserTasks: TaskModel[] = [];
  @Input() selectedUser: UserModel | null = null;

  constructor(private taskService: TaskService) {
  }

  deleteTask(id: number | undefined): void {
    if (!id) {
      return;
    }
    this.taskService.deleteTask(id);
    this.selectedUserTasks = this.taskService.getAllTasks().filter(task => task.userId === this.selectedUser?.id);
  }

  updateStatus(taskId: number | undefined) {
    if (!taskId) {
      return;
    }
    this.taskService.updateTaskStatus(taskId);
    console.log(this.taskService.getAllTasks().filter(task => task.userId === this.selectedUser?.id));
  }

}
