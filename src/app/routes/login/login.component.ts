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

  ngOnInit() {
    this.error$.pipe(takeUntil(this.destroy$)).subscribe((error) => {
      console.log(error);

      this.errorMessage = error;
    });
    this.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      console.log(user);
    });
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.store.dispatch(login({ userData: this.form.value }));
    }
  }
}
