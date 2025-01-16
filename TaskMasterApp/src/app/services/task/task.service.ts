import { Injectable } from '@angular/core';
import {TaskModel} from '../../models/task.model';
import {TaskDummyData} from '../dummydata/task-dummy-data';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks:TaskModel[] = [];
  private id = 13;

  constructor() {
    this.tasks = TaskDummyData;
  }

  getAllTasks(): TaskModel[] {
    return this.tasks;
  }

  createTask(title: string, description: string, date: Date, userId: number): void {
    const task: TaskModel = {
      id: this.id++,
      userId: userId,
      title,
      description,
      dueDate: date
    };
    this.tasks.push(task);
    console.log(task);
  }

  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }

}
