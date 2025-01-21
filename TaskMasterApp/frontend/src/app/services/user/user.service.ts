import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import {TaskModel} from '../../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = 'http://localhost:8080/api/users';

  private usersSubject: BehaviorSubject<UserModel[]> = new BehaviorSubject<UserModel[]>([]);
  users$: Observable<UserModel[]> = this.usersSubject.asObservable();

  private tasksSubject: BehaviorSubject<TaskModel[]> = new BehaviorSubject<TaskModel[]>([]); // TaskModel should be the type of task
  tasks$: Observable<TaskModel[]> = this.tasksSubject.asObservable(); // Public observable for tasks

  constructor(private http: HttpClient) {}

  getAllUsers(): void {
    this.http.get<UserModel[]>(this.apiUrl)
      .pipe(
        tap(users => this.usersSubject.next(users))
      )
      .subscribe({
        error: error => console.error('Error fetching users', error)
      });
  }

  createUser(name: string): void {
    this.http.post<UserModel>(this.apiUrl, { name }).subscribe(
      (newUser) => {
        console.log('User created successfully', newUser);
        const currentUsers = this.usersSubject.getValue();
        this.usersSubject.next([...currentUsers, newUser]);
      },
      (error) => {
        console.error('Error creating user', error);
      }
    );
  }


  getTaskByUserId(userId: number): void {
    console.log(`Fetching tasks for user ${userId}`);
    this.http.get<TaskModel[]>(`${this.apiUrl}/${userId}/tasks`)
      .pipe(
        tap(tasks => this.tasksSubject.next(tasks)) // Update tasks subject with new data
      )
      .subscribe({
        error: error => console.error('Error fetching tasks', error)
      });
  }
}
