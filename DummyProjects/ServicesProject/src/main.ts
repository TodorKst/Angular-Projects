import {bootstrapApplication} from '@angular/platform-browser';

import {AppComponent} from './app/app.component';
import {InjectionToken} from "@angular/core";
import {TasksService} from "./app/tasks/tasks.service";
import {TASK_STATUS_OPTIONS, taskStatusOptions} from "./app/tasks/task.model";

export const TaskServiceToken = new InjectionToken<TasksService>('TaskService');

bootstrapApplication(AppComponent,
  {
    providers: [{provide: TaskServiceToken, useClass: TasksService}, {
      provide: TASK_STATUS_OPTIONS,
      useValue: [taskStatusOptions]
    }]
  }
).catch((err) => console.error(err));
