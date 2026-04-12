import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { selectTheme } from './core/store/ui-control.selectors';
import { ThemeToggleComponent } from './core/components/theme-toggle/theme-toggle.component';
import { HeaderComponent } from './core/components/header/header.component';
import { UsersPageComponent } from './users/page/users-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    UsersPageComponent
  ],
  templateUrl: './app.html',
})
export class AppComponent {
  private store = inject(Store);

  theme = toSignal(this.store.select(selectTheme), {
    initialValue: 'light',
  });

  constructor() {
    effect(() => {
      const theme = this.theme();
      document.body.classList.remove('light', 'dark');
      document.body.classList.add(theme);
    });
  }
}