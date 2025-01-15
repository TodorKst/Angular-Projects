import { Injectable } from '@angular/core';
import {TaskModel} from '../../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks:TaskModel[] = [];

  constructor() { }

  getAllTasks(): TaskModel[] {
    return this.tasks;
  }

  createTask(task: TaskModel): void {
    this.tasks.push(task);
  }

  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }

  updateTask(task: TaskModel): void {
    this.tasks = this.tasks.map(t => {
      if (t.id === task.id) {
        task.completed = true;
      }
      return t;
    });
  }


}
