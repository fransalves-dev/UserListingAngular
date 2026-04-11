import {inject, Injectable} from '@angular/core';
import { UsersService } from '../services/users.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersActions } from './users.actions';
import { switchMap, map, catchError, of, tap } from 'rxjs';

@Injectable()
export class UsersEffects {
  actions$ = inject(Actions);
  constructor(
    private usersService: UsersService,
  ) { }

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      switchMap(() =>
        this.usersService.getUsers().pipe(
          map((users)=>
            UsersActions.loadUsersSuccess({ users })
          ),
          catchError((error) =>
            of(UsersActions.loadUsersFailure({ error: error.message }))
          )
        )
      )
    ));

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.addUser),
      switchMap(({ user }) =>
        this.usersService.createUser(user).pipe(
          
          map((newUser) =>
            UsersActions.addUserSuccess({ user: newUser })
          ),

          catchError((error) =>
            of(UsersActions.addUserFailure({ error: error.message }))
          )
        )
      )
    ));

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.updateUser),
      switchMap(({ id, user }) =>
        this.usersService.updateUser(id, user).pipe(
          map((updatedUser) =>
            UsersActions.updateUserSuccess({ user: updatedUser })
          ),
          catchError((error) =>
            of(UsersActions.updateUserFailure({ error: error.message }))
          )
        )
      )
    ));

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.deleteUser),
      switchMap(({ id }) =>
        this.usersService.deleteUser(id).pipe(
          map(() => UsersActions.deleteUserSuccess({ id })),
          catchError((error) =>
            of(UsersActions.deleteUserFailure({ error: error.message }))
          )
        )
      )
    ));
}