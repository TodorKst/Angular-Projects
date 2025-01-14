import { Injectable } from '@angular/core';
import {UserModel} from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: UserModel[] = [];

  constructor() {

  }

  getAllUsers(): UserModel[] {
    return this.users;
  }

  createUser(user: UserModel): void {
    this.users.push(user);
  }

  deleteUser(userId: number): void {
    this.users = this.users.filter(user => user.id !== userId);
  }


}
