import {Component, signal} from '@angular/core';
import {NewUserComponent} from '../new-user/new-user.component';

@Component({
  selector: 'app-navbar',
  imports: [
    NewUserComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: true
})
export class NavbarComponent {
  isAddingUser = signal(false);

  onStartAddUser() {
    this.isAddingUser.set(true);
  }
}
