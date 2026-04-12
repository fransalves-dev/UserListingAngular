import {
  Component,
  ViewChild,
  AfterViewInit,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { UsersActions } from '../../store/users.actions';
import { UserFormModalComponent } from '../forms/user-form-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../delete-user/delete-user.component';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UsersListComponent implements AfterViewInit, OnChanges {
  @Input() users: User[] = [];

  private store = inject(Store);

  displayedColumns = ['icon', 'name', 'email', 'actions'];

  dataSource = new MatTableDataSource<User>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['users']) {
      this.dataSource.data = this.users ?? [];
    }
  }

  private dialog = inject(MatDialog);

  editUser(user: User) {
    const dialogRef = this.dialog.open(UserFormModalComponent, {
      data: user,
      width: '600px',
      maxHeight: '90vh',
      maxWidth: '90vw',
      autoFocus: false,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(UsersActions.updateUser({ id: user.id, user: result }));
      }
    });
  }

  deleteUser(user: User) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: `Deseja deletar ${user.name}?` },
      width: '600px',
      maxHeight: '90vh',
      maxWidth: '90vw',
      autoFocus: false,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(UsersActions.deleteUser({ id: user.id }));
      }
    });
  }
}
