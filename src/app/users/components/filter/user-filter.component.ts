import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-users-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss'],
})
export class UsersFilterComponent {
  @Output() searchChange = new EventEmitter<string>();

  search = new FormControl('', [Validators.pattern(/^[a-zA-ZÀ-ÿ\s]*$/)]);

  isTyping = signal(false);

  constructor() {
    this.search.valueChanges
      .pipe(
        tap(() => this.isTyping.set(true)),
        debounceTime(300),
        tap(() => this.isTyping.set(false)),
      )
      .pipe(takeUntilDestroyed())
      .subscribe((term) => {
        if (this.search.invalid) return;

        this.searchChange.emit(term ?? '');
      });
  }
}
