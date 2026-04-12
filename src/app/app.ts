import { Component, computed, effect, output, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './app.html',
})
export class AppComponent {
}