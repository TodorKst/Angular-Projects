import { Component } from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {UserModel} from '../../models/user.model';

@Component({
  selector: 'app-homepage',
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  standalone: true
})
export class HomepageComponent {
  users: UserModel[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.users = this.userService.getAllUsers();
  }


}
