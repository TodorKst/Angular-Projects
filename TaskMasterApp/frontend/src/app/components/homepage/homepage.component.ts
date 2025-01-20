import { Component } from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {UserModel} from '../../models/user.model';
import {NgClass} from '@angular/common';
import {TaskListComponent} from '../task-list/task-list.component';
import {TaskService} from '../../services/task/task.service';
import {TaskModel} from '../../models/task.model';

@Component({
  selector: 'app-homepage',
  imports: [
    NgClass,
    TaskListComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  standalone: true
})
export class HomepageComponent {
  selectedUser: UserModel | null = null;
  selectedUserTasks: TaskModel[] = [];
  users: UserModel[] = [];

  constructor(private userService: UserService,
              private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data: UserModel[]) => {
      this.users = data;});
  }

  selectUser(user: UserModel): void {
    this.selectedUser = user;
    this.selectedUserTasks = this.taskService.getAllTasks().filter(task => task.userId === user.id);
    console.log('Selected user:', user.name);
  }


}
