import {Component, Input, WritableSignal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TaskService} from '../../services/task/task.service';
import {UserModel} from '../../models/user.model';
import {TaskModel} from '../../models/task.model';

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
  defaultDate = this.getTodayDate();

  @Input() selectedUser: UserModel | null = null;
  @Input() isAddingTask!: WritableSignal<boolean>;
  @Input() userTasks: TaskModel[] = [];

  constructor(private taskService: TaskService) {
  }

  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Ensure 2-digit month
    const day = String(today.getDate()).padStart(2, '0'); // Ensure 2-digit day
    return `${year}-${month}-${day}`;
  }

  onCreateTask() {
    if (!this.title || !this.description || !this.dueDate) {
      alert('Please fill in all fields.');
      return;
    }
    this.taskService.createTask(this.title, this.description, new Date(this.dueDate), this.selectedUser?.id || 0);
    this.isAddingTask.set(false);
    this.userTasks = this.taskService.getAllTasks().filter(task => task.userId === this.selectedUser?.id);
  }

  closeDialog() {
    this.isAddingTask.set(false);
  }

}
