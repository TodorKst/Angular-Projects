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

  constructor(private userService: UserService) {

  }

  getAllUsers(): UserModel[] {
    console.log(this.userService.getAllUsers())
    return this.userService.getAllUsers();
  }


}
