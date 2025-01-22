import {Component, Input} from '@angular/core';
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
  selectedUserTasks: TaskModel[] = [];

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.taskService.tasks$.subscribe((data: TaskModel[]) => {
      this.selectedUserTasks = data;
    });
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
    if (this.selectedUser) {
      this.taskService.getFilteredTaskByUserId(this.selectedUser?.id, this.taskService.getCurrentFilter());
    }
  }

}
