import {afterNextRender, Injectable} from '@angular/core';
import { TaskModel } from '../../models/task.model';
import { TaskDummyData } from '../dummydata/task-dummy-data';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserModel} from '../../models/user.model';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {UserService} from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private currentFilter = '';
  private currentUserId = 0;
  private readonly apiTaskUrl = 'http://localhost:8080/api/tasks';
  private readonly apiUserUrl = 'http://localhost:8080/api/users';

  private usersSubject: BehaviorSubject<UserModel[]> = new BehaviorSubject<UserModel[]>([]);
  users$: Observable<UserModel[]> = this.usersSubject.asObservable();

  private tasksSubject: BehaviorSubject<TaskModel[]> = new BehaviorSubject<TaskModel[]>([]); // TaskModel should be the type of task
  tasks$: Observable<TaskModel[]> = this.tasksSubject.asObservable(); // Public observable for tasks

  constructor(private http: HttpClient,
              private userService: UserService) {}

  getAllTasks(): void {
    this.http.get<TaskModel[]>(this.apiTaskUrl)
      .pipe(
        tap(tasks => this.tasksSubject.next(tasks))
      )
      .subscribe({
        error: error => console.error('Error fetching tasks', error)
      });
  }


  createTask(title: string, description: string, date: Date, userId: number): void {
    const task = {
      userId: userId,
      title,
      description,
      dueDate: date
    };
    this.http.post<UserModel>(this.apiTaskUrl, task).subscribe(
      (newUser) => {
        console.log('Task created successfully', newUser);
        const currentUsers = this.usersSubject.getValue();
        this.usersSubject.next([...currentUsers, newUser]);
        this.getTaskByUserId(userId);
      },
      (error) => {
        console.error('Error creating task', error);
      }
    );
  }

  deleteTask(taskId: number): void {
  }

  updateTaskStatus(taskId: number): void {
    console.log(`Updating task status for task ${taskId}`);
    this.http.put<{}>(`${this.apiTaskUrl}/${taskId}`, {})
      .subscribe({
        next: (response) => {
          // Update the tasks observable with the new data from the server(the updated task)
          this.getFilteredTaskByUserId(this.currentUserId, this.currentFilter);
        },
        error: (error) => {
          console.error('Error in PUT request:', error);
        }
      });
  }

  getTaskByUserId(userId: number): void {
    console.log(`Fetching tasks for user ${userId}`);
    this.http.get<TaskModel[]>(`${this.apiUserUrl}/${userId}/tasks`)
      .pipe(
        tap(tasks => this.tasksSubject.next(tasks)) // Update tasks subject with new data
      )
      .subscribe({
        error: error => console.error('Error fetching tasks', error)
      });
    this.currentUserId = userId;
  }

  getFilteredTaskByUserId(userId: number, filter: string): void {
    if (!filter || filter !== 'Open' && filter !== 'In Progress' && filter !== 'Completed') {
      this.getTaskByUserId(userId);
      console.log(this.tasks$.pipe());
      return;
    }
    console.log(`Fetching tasks for user ${userId}, with filter ${filter}`);
    this.http.get<TaskModel[]>(`${this.apiUserUrl}/${userId}/tasks?filter=${filter}`)
      .pipe(
        tap(tasks => this.tasksSubject.next(tasks)) // Update tasks subject with new data
      )
      .subscribe({
        error: error => console.error('Error fetching tasks', error)
      });
    this.currentFilter = filter;
    this.currentUserId = userId;
  }

  getCurrentFilter(): string {
    return this.currentFilter;
  }
}
