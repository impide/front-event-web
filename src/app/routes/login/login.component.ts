import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '../../store/auth/auth.actions';
import { Observable, Subject, takeUntil } from 'rxjs';
import { User } from '../../store/auth/auth.interface';
import { selectError, selectUser } from '../../store/auth/auth.selector';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  protected readonly form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  error$: Observable<string | null>;
  user$: Observable<User | null>;
  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient, private store: Store) {
    this.error$ = this.store.select(selectError);
    this.user$ = this.store.select(selectUser);
  }

  errorMessage: string | null = null;

  onSubmit() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const email = this.form.value.email as string;
      const password = this.form.value.password as string;
      this.store.dispatch(login({ userData: { email, password } }));
    }
  }
}
