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

  // BehaviorSubject to manage and share user state
  private usersSubject: BehaviorSubject<UserModel[]> = new BehaviorSubject<UserModel[]>([]);
  users$: Observable<UserModel[]> = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Fetch all users from the server and update the BehaviorSubject
  getAllUsers(): void {
    console.log('Fetching all users');
    this.http.get<UserModel[]>(this.apiUrl)
      .pipe(
        tap(users => this.usersSubject.next(users)) // Update the BehaviorSubject
      )
      .subscribe({
        error: error => console.error('Error fetching users', error)
      });
  }

  // Create a new user on the server and update the BehaviorSubject
  createUser(name: string): void {
    this.http.post<UserModel>(this.apiUrl, { name }).subscribe(
      (newUser) => {
        console.log('User created successfully', newUser);
        const currentUsers = this.usersSubject.getValue();
        this.usersSubject.next([...currentUsers, newUser]); // Add the new user to the current list
      },
      (error) => {
        console.error('Error creating user', error);
      }
    );
  }
}
