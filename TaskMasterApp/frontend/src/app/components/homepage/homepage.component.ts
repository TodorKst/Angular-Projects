import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { TaskService } from '../../services/task/task.service';
import { UserModel } from '../../models/user.model';
import { TaskModel } from '../../models/task.model';
import { NgClass } from '@angular/common';
import { TaskListComponent } from '../task-list/task-list.component';

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
  users: UserModel[] = [];

  constructor(private userService: UserService,
              private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.userService.users$.subscribe((data: UserModel[]) => {
      this.users = data;
    });
    this.userService.getAllUsers();
  }

  selectUser(user: UserModel): void {
    this.selectedUser = user;
    console.log('Selected user:', user.name);
  }
}
