import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { selectTheme } from '../../store/ui-control.selectors';
import { UIControlActions } from '../../store/ui-control.actions';
import { initialUIControlState } from '../../store/ui-control.state';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'main-header',
  standalone: true,
  imports: [ThemeToggleComponent, MatIcon],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']

})
export class HeaderComponent {
}