import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {UserComponent} from './user/user.component';
import {DUMMY_USERS} from './dummy-users';
import {UserTasksComponent} from './user-tasks/user-tasks.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, UserComponent, UserTasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  users = DUMMY_USERS;
  selectedUserId = 'u1';

get selectedUser() {
  return this.users.find(user => user.id === this.selectedUserId)!;
}

  onSelectedUser(id: string) {
    this.selectedUserId = id;
  }
}
