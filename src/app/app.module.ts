import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {UserComponent} from './user/user.component';
import {HeaderComponent} from './header/header.component';
import {UserTasksComponent} from './user-tasks/user-tasks.component';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HeaderComponent, UserComponent, UserTasksComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
