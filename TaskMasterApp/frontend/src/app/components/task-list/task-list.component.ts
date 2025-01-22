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
  selectedUserTasks: TaskModel[] = [];
  isAddingTask = signal(false);

  currentFilter = 'All';

  constructor(private taskService: TaskService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.taskService.tasks$.subscribe((data: TaskModel[]) => {
      this.selectedUserTasks = data;
    });
  }

  ngOnChanges(): void {
    if (this.selectedUser !== null) {
      this.taskService.getTaskByUserId(this.selectedUser?.id);
    }
  }


  onStartAddTask(): void {
    this.isAddingTask.set(true);
  }

  changeSortOrder() {
    if (this.sortingOrder() === 'asc') {
      this.sortingOrder.set('desc');
    } else {
      this.sortingOrder.set('asc');
    }

    if (this.sortingOrder() === 'asc') {
      this.selectedUserTasks = this.selectedUserTasks.sort((a, b) => a.id - b.id);
    } else {
      this.selectedUserTasks = this.selectedUserTasks.sort((a, b) => b.id - a.id);
    }
  }

  filterTasks(event: Event) {
    this.currentFilter = (event.target as HTMLSelectElement).value;
    if (this.currentFilter === 'All') {
      if (this.selectedUser !== null) {
        this.taskService.getTaskByUserId(this.selectedUser?.id);
      }
    } else {
      if (this.selectedUser !== null) {
        this.taskService.getFilteredTaskByUserId(this.selectedUser?.id, this.currentFilter);
      }

    }
  }

}
