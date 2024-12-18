import {Component, DestroyRef, inject, input, OnInit} from '@angular/core';
import {UsersService} from "../users.service";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot
} from "@angular/router";

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
export class UserTasksComponent {
  // userId = input.required<string>();
  userName = input<string>('userName');
  private activatedRoute = inject(ActivatedRoute);


  // ngOnInit() {
  //   this.activatedRoute.data.subscribe({
  //     next: data => {
  //       console.log(data);
  //     }
  //   })
  // }



  // userName = computed(
  //   () => this.usersService.users.find(u => u.id === this.userId())?.name);
}

export const resolveUserName: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
  const service = inject(UsersService);

  return service.users.find(u => u.id === activatedRoute.paramMap.get('userId'))?.name || '';
}
