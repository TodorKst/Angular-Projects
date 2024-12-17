import {Component, computed, DestroyRef, inject, input, OnInit} from '@angular/core';
import {UsersService} from "../users.service";
import {ActivatedRoute, RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [
    RouterOutlet,
    RouterLink
  ]
})
export class UserTasksComponent implements OnInit {
  // userId = input.required<string>();
  userName = '';
  private activatedRoute = inject(ActivatedRoute);
  private usersService = inject(UsersService);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    console.log(this.activatedRoute.snapshot);
    const sub = this.activatedRoute.paramMap.subscribe({
      next: paramMap => {
        this.userName = this.usersService.users.find((u) => u.id === paramMap.get('userId'))?.name || '';
      }
    });

    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }

  // userName = computed(
  //   () => this.usersService.users.find(u => u.id === this.userId())?.name);

}
