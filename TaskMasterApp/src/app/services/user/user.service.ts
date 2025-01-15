import {Injectable} from '@angular/core';
import {UserModel} from '../../models/user.model';
import {userDummyData} from '../dummydata/user-dummy-data';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: UserModel[] = [];
  private id = 7;

  constructor() {
    this.users = userDummyData;
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

  getUserById(userId: number): UserModel {
    return <UserModel>this.users.find(user => user.id === userId);
  }


}
