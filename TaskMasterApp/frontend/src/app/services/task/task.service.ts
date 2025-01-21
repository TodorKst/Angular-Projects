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
  private readonly apiUrl = 'http://localhost:8080/api/tasks';

  private usersSubject: BehaviorSubject<UserModel[]> = new BehaviorSubject<UserModel[]>([]);
  users$: Observable<UserModel[]> = this.usersSubject.asObservable();

  private tasksSubject: BehaviorSubject<TaskModel[]> = new BehaviorSubject<TaskModel[]>([]); // TaskModel should be the type of task
  tasks$: Observable<TaskModel[]> = this.tasksSubject.asObservable(); // Public observable for tasks

  constructor(private http: HttpClient,
              private userService: UserService) {}

  getAllTasks(): void {
    this.http.get<TaskModel[]>(this.apiUrl)
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
    this.http.post<UserModel>(this.apiUrl, task).subscribe(
      (newUser) => {
        console.log('Task created successfully', newUser);
        const currentUsers = this.usersSubject.getValue();
        this.usersSubject.next([...currentUsers, newUser]);
        this.userService.getTaskByUserId(userId);
      },
      (error) => {
        console.error('Error creating task', error);
      }
    );
  }

  deleteTask(taskId: number): void {

  }

  updateTaskStatus(taskId: number): void {
    // const task = this.tasks.find(task => task.id === taskId);
    //
    // if (task?.status === 'Open') {
    //   task.status = 'In Progress';
    // } else if (task?.status === 'In Progress') {
    //   task.status = 'Completed';
    // }
    // this.saveTasksToStorage(); // Update localStorage
  }
}
