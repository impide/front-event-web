import { Component, Signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectUser } from './store/auth/auth.selector';
import { injectAuthFeature } from './store/auth/auth.store';
import { User } from './store/auth/auth.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'front-event-web';
  readonly authFeature = injectAuthFeature();

  isAuth$: Signal<boolean | undefined>;
  user$: Signal<User | null | undefined>;

  constructor(private store: Store) {
    this.isAuth$ = computed(() => this.authFeature.selectIsAuth());
    this.user$ = toSignal(this.store.select(selectUser));
  }
  autoLoginAuth() {
    const token = localStorage.getItem('token');
    console.log(this.isAuth$());
    console.log(this.user$());
    if (!token) return;

    if (!this.isAuth$()) {
      this.authFeature.autoLogin(token);
    }
  }

  ngOnInit() {
    this.autoLoginAuth();
  }
}
