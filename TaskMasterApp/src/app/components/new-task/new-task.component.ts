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
  dueDate = '';

  @Input() selectedUser: UserModel | null = null;
  @Input() isAddingTask!: WritableSignal<boolean>;
  @Input() userTasks!: WritableSignal<TaskModel[]>;

  constructor(private taskService: TaskService) {
  }

  onCreateTask() {
    this.taskService.createTask(this.title, this.description, new Date(this.dueDate), this.selectedUser?.id || 0);
    this.isAddingTask.set(false);
    this.userTasks.set(this.taskService.getAllTasks().filter(task => task.userId === this.selectedUser?.id));
  }

  closeDialog() {
    this.isAddingTask.set(false);
  }

}
