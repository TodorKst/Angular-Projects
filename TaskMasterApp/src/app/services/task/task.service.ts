import { Injectable } from '@angular/core';
import {Task} from '../../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks:Task[] = [];

  constructor() { }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(task: Task): void {
    this.tasks.push(task);
  }

  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }

  updateTask(task: Task): void {
    this.tasks = this.tasks.map(t => {
      if (t.id === task.id) {
        task.completed = true;
      }
      return t;
    });
  }


}
