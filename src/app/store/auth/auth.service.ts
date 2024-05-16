import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  LogginResponse,
  User,
  UserLogin,
  UserRegister,
} from './auth.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly #http = inject(HttpClient);

  login(userData: UserLogin): Observable<LogginResponse> {
    return this.#http.post<LogginResponse>(
      'http://localhost:3000/auth/signin',
      userData
    );
  }

  register(userData: UserRegister): Observable<string> {
    return this.#http.post<string>(
      'http://localhost:3000/auth/signup',
      userData
    );
  }
}
