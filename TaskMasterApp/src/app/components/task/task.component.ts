import {Component, Input, signal} from '@angular/core';
import {UserModel} from '../../models/user.model';
import {TaskModel} from '../../models/task.model';
import {DatePipe, NgClass, TitleCasePipe} from '@angular/common';
import {TaskService} from '../../services/task/task.service';
import {NewTaskComponent} from '../new-task/new-task.component';

@Component({
  selector: 'app-task',
  imports: [
    NewTaskComponent,
    NgClass,
    TitleCasePipe,
    DatePipe
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  standalone: true
})
export class TaskComponent {
  sortingOrder = signal('asc');

  @Input() selectedUser: UserModel | null = null;
  selectedUserTasks = signal([] as TaskModel[]);
  isAddingTask = signal(false);

  constructor(private taskService: TaskService) {
  }

  ngOnChanges(): void {
    this.selectedUserTasks.set(this.taskService.getAllTasks().filter(task => task.userId === this.selectedUser?.id));
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
    this.selectedUserTasks.set(this.taskService.getAllTasks().filter(task => task.userId === this.selectedUser?.id));
  }

  onStartAddTask(): void {
    this.isAddingTask.set(true);
    console.log(this.taskService.getAllTasks());
  }

  changeSortOrder() {
    if (this.sortingOrder() === 'asc') {
      this.sortingOrder.set('desc');
    } else {
      this.sortingOrder.set('asc');
    }

    if (this.sortingOrder() === 'asc') {
      this.selectedUserTasks.set(this.selectedUserTasks().sort((a, b) => a.id - b.id));
    } else {
      this.selectedUserTasks.set(this.selectedUserTasks().sort((a, b) => b.id - a.id));
    }
  }

  updateStatus(taskId: number) {
    this.taskService.updateTaskStatus(taskId);
    console.log(this.taskService.getAllTasks().filter(task => task.userId === this.selectedUser?.id));
  }
}
