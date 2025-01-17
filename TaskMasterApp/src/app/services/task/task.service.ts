import {afterNextRender, Injectable} from '@angular/core';
import { TaskModel } from '../../models/task.model';
import { TaskDummyData } from '../dummydata/task-dummy-data';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: TaskModel[] = [];
  private id: number = 13;
  private readonly storageKey = 'tasks';

  constructor() {
    this.loadTasks();
  }

  private loadTasks() {
    const tasks = localStorage.getItem(this.storageKey);
    if (tasks) {
      this.tasks = JSON.parse(tasks);
    } else {
      this.tasks = TaskDummyData;
      this.saveTasksToStorage();
    }
  }

  private saveTasksToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
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
    this.saveTasksToStorage(); // Save to localStorage
    console.log(task);
  }

  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.saveTasksToStorage(); // Update localStorage
  }
}
