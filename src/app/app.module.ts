import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {UserComponent} from './user/user.component';
import {HeaderComponent} from './header/header.component';
import {UserTasksComponent} from './user-tasks/user-tasks.component';
import {BrowserModule} from '@angular/platform-browser';
import {CardComponent} from './shared/card/card.component';
import {TaskComponent} from './user-tasks/task/task.component';
import {AddTaskComponent} from './user-tasks/add-task/add-task.component';
import {DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [AppComponent, HeaderComponent, UserComponent, UserTasksComponent, CardComponent, TaskComponent, AddTaskComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
