import {Component, Input, Signal, WritableSignal} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-new-user',
  imports: [
    FormsModule
  ],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css',
  standalone: true
})
export class NewUserComponent {
  @Input() isAddingUser!: WritableSignal<boolean>;
  firstName = '';
  lastName = '';

  constructor(private userService: UserService) {
  }

  createUser() {
    this.userService.createUser(this.firstName + ' ' + this.lastName);
    this.isAddingUser.set(false);
  }

  closeDialog() {
    this.isAddingUser.set(false);
  }
}
