import {Component, Input, WritableSignal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TaskService} from '../../services/task/task.service';
import {UserModel} from '../../models/user.model';
import {TaskModel} from '../../models/task.model';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-new-task',
  imports: [
    FormsModule
  ],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
  standalone: true
})
export class NewTaskComponent {
  title = '';
  description = '';
  dueDate = this.getTodayDate();
  selectedUserTasks: TaskModel[] = [];


  @Input() selectedUser: UserModel | null = null;
  @Input() isAddingTask!: WritableSignal<boolean>;

  constructor(private taskService: TaskService, private userService: UserService) {
  }

  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Ensure 2-digit month
    const day = String(today.getDate()).padStart(2, '0'); // Ensure 2-digit day
    return `${year}-${month}-${day}`;
  }

  ngOnChanges(): void {
    this.taskService.tasks$.subscribe((data: TaskModel[]) => {
      this.selectedUserTasks = data;
    });
    if (this.selectedUser !== null) {
      this.taskService.getTaskByUserId(this.selectedUser?.id);
    }
  }

  createTask() {
    if (!this.title || !this.description || !this.dueDate) {
      alert('Please fill in all fields.');
      return;
    }


    this.taskService.createTask(this.title, this.description, new Date(this.dueDate), this.selectedUser?.id || 0);

    if (this.selectedUser !== null) {
      this.taskService.getTaskByUserId(this.selectedUser?.id);
    }
    this.isAddingTask.set(false);
  }

  closeDialog() {
    this.isAddingTask.set(false);
  }

}
