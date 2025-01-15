import { Component } from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {UserModel} from '../../models/user.model';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-homepage',
  imports: [
    NgClass
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  standalone: true
})
export class HomepageComponent {
  selectedUser: UserModel | null = null;
  users: UserModel[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.users = this.userService.getAllUsers();
  }

  selectUser(user: UserModel): void {
    this.selectedUser = user;
    console.log('Selected user:', user.name);
  }


}
