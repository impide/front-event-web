import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '../../../store/auth/auth.interface';
import { injectAuthFeature } from '../../../store/auth/auth.store';

@Component({
  selector: 'app-informations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './informations.component.html',
  styleUrl: './informations.component.css',
})
export class InformationsComponent {
  readonly authFeature = injectAuthFeature();
  user$: Signal<User | null | undefined>;
  constructor(private store: Store) {
    this.user$ = this.authFeature.selectUser;
  }
}
