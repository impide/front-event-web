import { HttpClient } from '@angular/common/http';
import { Component, Signal } from '@angular/core';
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from '../../store/auth/auth.interface';
import { injectAuthFeature } from '../../store/auth/auth.store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  readonly authFeature = injectAuthFeature();
  protected readonly form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  error$: Signal<string | null>;
  user$: Signal<User | null>;

  constructor(private http: HttpClient, private store: Store) {
    this.error$ = this.authFeature.selectError;
    this.user$ = this.authFeature.selectUser;
  }

  errorMessage: string | null = null;

  onSubmit() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const email = this.form.value.email as string;
      const password = this.form.value.password as string;
      this.authFeature.login({ email, password });
    }
  }
}
