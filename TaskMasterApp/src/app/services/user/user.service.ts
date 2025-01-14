import { Injectable } from '@angular/core';
import {UserModel} from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: UserModel[] = [];
  private id = 1;
  constructor() {

  }

  getAllUsers(): UserModel[] {
    return this.users;
  }

  createUser(name: string): void {
    this.users.push({id: this.id++, name: name});
  }

  deleteUser(userId: number): void {
    this.users = this.users.filter(user => user.id !== userId);
  }


}
