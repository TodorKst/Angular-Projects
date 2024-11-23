import {Component, computed, EventEmitter, Input, input, output, Output} from '@angular/core';
import {User} from './user.model';
import {CardComponent} from '../shared/card/card.component';



@Component({
  selector: 'app-user',
  imports: [CardComponent],
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  @Input({required: true}) user?: User;
  @Input({required: true}) selected!: boolean;

  @Output() select = new EventEmitter<string>();

  imagePath = computed(() => {
    return `assets/users/` + this.user!.avatar;
  });

  onSelectUser() {
    this.select.emit(this.user!.id);
  }
}
