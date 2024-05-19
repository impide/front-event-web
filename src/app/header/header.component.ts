import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { User } from '../store/auth/auth.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatMenuModule } from '@angular/material/menu';
import { injectAuthFeature } from '../store/auth/auth.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  readonly authFeature = injectAuthFeature();

  showMenu = false;
  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }
  private destroy$ = new Subject<void>();
  isAuth$: Signal<boolean | undefined>;
  user$: Signal<User | null>;
  constructor(private store: Store) {
    this.isAuth$ = this.authFeature.selectIsAuth;
    this.user$ = this.authFeature.selectUser;
  }
}
