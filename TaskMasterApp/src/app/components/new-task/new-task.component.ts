import {Component, Input, WritableSignal} from '@angular/core';

@Component({
  selector: 'app-new-task',
  imports: [],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
  standalone: true
})
export class NewTaskComponent {
  @Input() isAddingTask!: WritableSignal<boolean>;

  onCreateTask() {
    // Create a new task
    this.isAddingTask.set(false);
    console.log(this.isAddingTask);
  }

  closeDialog() {
    this.isAddingTask.set(false);
    console.log(this.isAddingTask);

  }

}
