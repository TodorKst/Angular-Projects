import {afterNextRender, Component, DestroyRef, inject, viewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    FormsModule
  ]
})
export class LoginComponent {
  private form = viewChild.required<NgForm>('form');
  private destroyRef = inject(DestroyRef);



  constructor() {
    afterNextRender(() => {
      const savedForm = window.localStorage.getItem('loginForm');

      if (savedForm) {
        const loadedForm = JSON.parse(window.localStorage.getItem('loginForm') || '{}');
        const savedEmail = loadedForm.email;
        const savedPassword = loadedForm.password;
        setTimeout(() => {
          this.form().setValue({email: savedEmail, password: savedPassword})
        }, 2);
      }

      this.form().valueChanges?.pipe(debounceTime(190)).subscribe({
        next: (value) => window.localStorage.setItem('loginForm', JSON.stringify({email: value.email, password: value.password}))});

    });
  }

  onSubmit(formData: NgForm) {
    if (formData.invalid) {
      return;
    }

    const enteredEmail = formData.value.email;
    const enteredPassword = formData.value.password;

    formData.form.reset();

  }

}
