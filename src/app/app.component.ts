import {
  Component,
  Inject,
  PLATFORM_ID,
  Signal,
  computed,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { injectAuthFeature } from './store/auth/auth.store';
import { User } from './store/auth/auth.interface';
import { isPlatformBrowser } from '@angular/common';

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
  isBrowser: boolean;

  constructor(
    private store: Store,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isAuth$ = computed(() => this.authFeature.selectIsAuth());
    this.user$ = this.authFeature.selectUser;
    this.isBrowser = isPlatformBrowser(platformId);
  }
  autoLoginAuth() {
    if (this.isBrowser) {
      const token = localStorage.getItem('token');
      if (!token) return;

      if (!this.isAuth$()) {
        this.authFeature.autoLogin(token);
      }
    }
  }

  ngOnInit() {
    this.autoLoginAuth();
  }
}
