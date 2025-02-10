import {Component} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

function equalValues(controlName1: string, controlName2: string) {

  return (control: AbstractControl) => {
    if (control.get(controlName1)?.value === control.get(controlName2)?.value) {
      return null;
    }
    return {passwordsNotEqual: true};
  }
}

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [
    ReactiveFormsModule
  ]
})
export class SignupComponent {

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
      }),
    }, {
      validators: [equalValues('password', 'confirmPassword')],
    }),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    address: new FormGroup({
      street: new FormControl('', [Validators.required]),
      streetNumber: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
    }),
    role: new FormControl('student', [Validators.required]),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false)
    ]),
    agree: new FormControl(false, [Validators.requiredTrue])
  });

  onSubmit() {
    if (this.form.invalid) {
      console.log('Form is invalid');
    }

    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.passwords?.password;
    console.log(enteredEmail);
    console.log(enteredPassword);
  }

  onReset() {
    this.form.reset();
  }
}


