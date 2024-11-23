import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {newTaskData} from '../task/task.model';
import {TaskService} from '../task.service';

@Component({
  selector: 'app-add-task',
  imports: [
    FormsModule
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
  standalone: true
})
export class AddTaskComponent {
  @Input({required: true}) userId!: string;
  @Output() close = new EventEmitter<void>();
  enteredTitle = '';
  enteredSummary = '';
  enteredDueDate = '';

  constructor(private taskService: TaskService) {
  }


  onEndAddTask() {
    this.close.emit();
  }

  onSubmit() {
    this.taskService.addTask({
      title: this.enteredTitle,
      summary: this.enteredSummary,
      date: this.enteredDueDate
    }, this.userId)
    this.close.emit();
  }
}
