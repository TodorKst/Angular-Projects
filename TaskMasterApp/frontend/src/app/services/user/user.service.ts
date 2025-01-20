import {Injectable} from '@angular/core';
import {UserModel} from '../../models/user.model';
import {UserDummyData} from '../dummydata/user-dummy-data';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: UserModel[] = [];
  private id = 7;
  private readonly storageKey = 'users';

  constructor() {
    this.loadUsers();
  }

  private loadUsers() {
    const tasks = localStorage.getItem(this.storageKey);
    if (tasks) {
      this.users = JSON.parse(tasks);
      this.id = this.users.reduce((prev, current) => (prev.id > current.id) ? prev : current).id + 1;
      console.log(this.id);
    } else {
      this.users = UserDummyData;
      this.saveTasksToStorage();
    }
  }

  private saveTasksToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.users));
  }
  getAllUsers(): UserModel[] {
    return this.users;
  }

  createUser(name: string): void {
    this.users.push({id: this.id++, name: name});
    this.saveTasksToStorage();
  }

  deleteUser(userId: number): void {
    this.users = this.users.filter(user => user.id !== userId);
    this.saveTasksToStorage();
  }

  getUserById(userId: number): UserModel {
    return <UserModel>this.users.find(user => user.id === userId);
  }


}
