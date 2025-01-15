import {Component, Input} from '@angular/core';
import {UserModel} from '../../models/user.model';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  standalone: true
})
export class TaskComponent {
@Input() selectedUser: UserModel | null = null;

}
