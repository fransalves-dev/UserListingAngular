import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { selectTheme } from '../../store/ui-control.selectors';
import { UIControlActions } from '../../store/ui-control.actions';
import { initialUIControlState } from '../../store/ui-control.state';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [MatButtonToggleModule, MatIconModule],
  templateUrl: './theme-toggle.component.html',
})
export class ThemeToggleComponent {
  private store = inject(Store);

  theme = toSignal(this.store.select(selectTheme), { initialValue: initialUIControlState.theme });

  toggleTheme() {
    const newTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.store.dispatch(
      UIControlActions.setTheme({ theme: newTheme })
    );
  }
}