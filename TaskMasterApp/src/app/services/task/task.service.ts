import { Injectable } from '@angular/core';
import {TaskModel} from '../../models/task.model';
import {TaskDummyData} from '../dummydata/task-dummy-data';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks:TaskModel[] = [];

  constructor() {
    this.tasks = TaskDummyData;
  }

  getAllTasks(): TaskModel[] {
    return this.tasks;
  }

  createTask(task: TaskModel): void {
    this.tasks.push(task);
  }

  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }

}
