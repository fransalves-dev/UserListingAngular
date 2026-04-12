import { Component, inject, effect, signal, computed } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { UsersActions } from '../store/users.actions';

import { UsersFilterComponent } from '../components/filter/user-filter.component';
import { UsersListComponent } from '../components/list/user-list.component';
import { selectUsers, selectUsersLoading, selectUsersError } from '../store/users.selector';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UserFormModalComponent } from '../components/forms/user-form-modal.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [UsersFilterComponent, UsersListComponent, CommonModule, MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
})
export class UsersPageComponent {
  private store = inject(Store);

  searchTerm = signal('');

  users = toSignal(this.store.select(selectUsers), { initialValue: [] });
  loading = toSignal(this.store.select(selectUsersLoading), { initialValue: false });
  error = toSignal(this.store.select(selectUsersError), { initialValue: null });

  filteredUsers = computed(() => {
    const users = this.users();
    const term = this.searchTerm().toLowerCase();

    if (!users) return [];

    if (!term) return users;

    return users.filter((user) => user.name.toLowerCase().includes(term));
  });

  constructor() {
  effect(() => {
    console.log('USERS:', this.users());
    console.log('FILTERED:', this.filteredUsers());
  });
}
  ngOnInit() {
    this.store.dispatch(UsersActions.loadUsers());
  }

  private dialog = inject(MatDialog);

  openCreate() {
    const dialogRef = this.dialog.open(UserFormModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(UsersActions.addUser({ user: result }));
      }
    });
  }

  onSearch(term: string) {
    this.searchTerm.set(term);
  }
}
