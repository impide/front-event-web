import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { selectIsAuth, selectUser } from '../store/auth/auth.selector';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { User } from '../store/auth/auth.interface';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  showMenu = false;
  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }
  isAuth$: Signal<boolean | undefined>;
  user$: Observable<User | null>;
  constructor(private store: Store) {
    this.isAuth$ = toSignal(this.store.select(selectIsAuth));
    this.user$ = this.store.select(selectUser);
  }
}
