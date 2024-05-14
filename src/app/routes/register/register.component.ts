import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { register } from '../../store/auth/auth.actions';
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectError } from '../../store/auth/auth.selector';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  protected readonly form = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  error$: Observable<string | null>;
  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient, private store: Store) {
    this.error$ = this.store.select(selectError);
  }

  errorMessage: string | null = null;

  ngOnInit() {
    this.error$.pipe(takeUntil(this.destroy$)).subscribe((error) => {
      this.errorMessage = error;
    });
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.store.dispatch(register({ userData: this.form.value }));
    }
  }
}
