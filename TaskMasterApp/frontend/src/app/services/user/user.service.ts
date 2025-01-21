import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = 'http://localhost:8080/api/users';

  private usersSubject: BehaviorSubject<UserModel[]> = new BehaviorSubject<UserModel[]>([]);
  users$: Observable<UserModel[]> = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {}


  getAllUsers(): void {
    console.log('Fetching all users');
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

  getTaskByUserId(userId: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.apiUrl}/${userId}/tasks`);
  }
}
