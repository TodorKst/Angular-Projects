import {Component, Input, signal} from '@angular/core';
import {UserModel} from '../../models/user.model';
import {TaskModel} from '../../models/task.model';
import {TaskService} from '../../services/task/task.service';
import {NewTaskComponent} from '../new-task/new-task.component';
import {TaskComponent} from '../task/task.component';
import {NgIf} from '@angular/common';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-task-list',
  imports: [
    NewTaskComponent,
    TaskComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  standalone: true
})
export class TaskListComponent {
  sortingOrder = signal('asc');

  @Input() selectedUser: UserModel | null = null;
  selectedUserTasks = signal([] as TaskModel[]);
  isAddingTask = signal(false);

  currentFilter = 'all';

  constructor(private taskService: TaskService) {
  }

  ngOnChanges(): void {
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

  filterTasks(event: Event) {
    this.currentFilter = (event.target as HTMLSelectElement).value;
    if (this.currentFilter === 'All') {
      this.selectedUserTasks.set(this.taskService.getAllTasks().filter(task => task.userId === this.selectedUser?.id));
    } else {
      this.selectedUserTasks.set(this.taskService.getAllTasks().filter(task => task.userId === this.selectedUser?.id && task.status === this.currentFilter));
    }
  }

}
