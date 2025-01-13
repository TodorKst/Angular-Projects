import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';

@Component({
  selector: 'app-root',
  imports: [ HomepageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  title = 'TaskMasterApp';
}
