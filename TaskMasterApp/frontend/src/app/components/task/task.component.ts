import {Component, input, Input, signal, WritableSignal} from '@angular/core';
import {TaskModel} from '../../models/task.model';
import {DatePipe, NgClass, TitleCasePipe} from '@angular/common';
import {TaskService} from '../../services/task/task.service';
import {UserModel} from '../../models/user.model';
import {UserService} from '../../services/user/user.service';

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
  @Input() selectedUser: UserModel | null = null;

  constructor(private taskService: TaskService) {
  }

  deleteTask(id: number | undefined): void {
    if (!id) {
      return;
    }
    this.taskService.deleteTask(id);
  }


  updateStatus(taskId: number | undefined) {
    if (!taskId) {
      return;
    }
    this.taskService.updateTaskStatus(taskId);
  }

}
