import {Injectable} from '@angular/core';
import {UserModel} from '../../models/user.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  private readonly apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<UserModel[]> {
    console.log('Get all users');
    return this.http.get<UserModel[]>(this.apiUrl);
  }

  createUser(name: string): void {
  //   later
  }



}
