import { Component, Signal, inject } from '@angular/core';
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { injectAuthFeature } from '../../store/auth/auth.store';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  readonly authFeature = injectAuthFeature();
  protected readonly form = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  error$: Signal<string | null | undefined>;

  constructor() {
    this.error$ = this.authFeature.selectError;
  }
  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const email = this.form.value.email as string;
      const password = this.form.value.password as string;
      const username = this.form.value.username as string;
      this.authFeature.register({ email, password, username });
    }
  }
}
