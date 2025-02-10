import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {debounceTime, of} from "rxjs";

function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null;
  }
  return {doesNotContainQuestionMark: true};
}

function emailIsUnique(control: AbstractControl) {
  console.log(control.value);
  if (control.value !== 'test@example.com') {
    return null;
  }

  return of({notUnique: true});
}

const savedForm = window.localStorage.getItem('loginForm');
let initialEmailValue = '';

if (savedForm) {
  const loadedForm = JSON.parse(savedForm);
  initialEmailValue = loadedForm.email;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent{
  destroyRef = inject(DestroyRef);

  form = new FormGroup({
    email: new FormControl(initialEmailValue, {
      validators: [Validators.required, Validators.email, emailIsUnique]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark]
    })
  });

  // ngOnInit() {
  //   const loginForm = window.localStorage.getItem('loginForm');
  //
  //   if (loginForm) {
  //     const loadedForm = JSON.parse(loginForm);
  //     this.form.patchValue(loadedForm);
  //   }
  //
  //   const sub = this.form.valueChanges.pipe(debounceTime(150)).subscribe({
  //       next: (value) => {
  //         window.localStorage.setItem('loginForm', JSON.stringify({
  //           email: value.email,
  //         }));
  //
  //       }
  //     }
  //   )
  //
  //   this.destroyRef.onDestroy(() => sub.unsubscribe())
  //
  // }

  onSubmit() {
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
    console.log(enteredEmail);
    console.log(enteredPassword);


    this.form.reset();
  }

  get emailIsInvalid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }


  get passwordIsInvalid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }
}
