import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectError, selectUser } from '../../../store/auth/auth.selector';
import { User } from '../../../store/auth/auth.interface';

@Component({
  selector: 'app-informations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './informations.component.html',
  styleUrl: './informations.component.css',
})
export class InformationsComponent {
  user$: Signal<User | null | undefined>;
  constructor(private store: Store) {
    this.user$ = toSignal(this.store.select(selectUser));
  }
}
