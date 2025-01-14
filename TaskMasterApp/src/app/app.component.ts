import {Component} from '@angular/core';
import {HomepageComponent} from './components/homepage/homepage.component';
import {NavbarComponent} from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [HomepageComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  title = 'TaskMasterApp';
}
