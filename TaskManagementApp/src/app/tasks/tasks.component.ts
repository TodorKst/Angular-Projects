import {Component, computed, inject, input} from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import {TasksService} from "./tasks.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  order = input<'asc' | 'desc'>();

  userId = input.required<string>();
  private tasksService = inject(TasksService);

  userTasks = computed(() => {
    return this.tasksService.allTasks().filter((task: Task) => task.userId === this.userId())
      .sort((a, b) => {
        if (this.order() === 'asc') {
          return a.id > b.id? -1 : 1;
        } else {
          return b.id > a.id ? -1 : 1;
        }
      });
  });




}
