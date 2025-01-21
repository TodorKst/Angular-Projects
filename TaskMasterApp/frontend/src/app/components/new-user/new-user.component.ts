import { Component, Input, OnInit, WritableSignal } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-new-user',
  imports: [FormsModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css',
  standalone: true
})
export class NewUserComponent implements OnInit {
  @Input() isAddingUser!: WritableSignal<boolean>;
  firstName = '';
  lastName = '';
  users: UserModel[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Subscribe to the shared users observable
    this.userService.users$.subscribe((data: UserModel[]) => {
      this.users = data;
    });

    // Fetch initial users
    this.userService.getAllUsers();
  }

  createUser(): void {
    const fullName = `${this.firstName} ${this.lastName}`;
    this.userService.createUser(fullName);
    this.isAddingUser.set(false); // Close the dialog after creating the user
  }

  closeDialog(): void {
    this.isAddingUser.set(false);
  }
}
