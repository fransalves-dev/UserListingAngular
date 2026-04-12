import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersActions } from '../../users/store/users.actions';
import { map, of, tap } from 'rxjs';
import { UIControlActions } from './ui-control.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '../components/toast/toast.component';

@Injectable()
export class UIControlEffects {
  private actions$ = inject(Actions);
  private snackBar = inject(MatSnackBar);

  showSuccessToast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        UsersActions.addUserSuccess,
        UsersActions.updateUserSuccess,
        UsersActions.deleteUserSuccess,
      ),
      map((action) => {
        if (action.type === UsersActions.addUserSuccess.type) {
          return UIControlActions.showToast({
            toast: {
              type: 'success',
              message: 'Usuário criado com sucesso!',
            },
          });
        }

        if (action.type === UsersActions.updateUserSuccess.type) {
          return UIControlActions.showToast({
            toast: {
              type: 'success',
              message: 'Usuário atualizado com sucesso!',
            },
          });
        }

        return UIControlActions.showToast({
          toast: {
            type: 'success',
            message: 'Usuário deletado com sucesso!',
          },
        });
      }),
    ),
  );

  showErrorToast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        UsersActions.loadUsersFailure,
        UsersActions.addUserFailure,
        UsersActions.updateUserFailure,
        UsersActions.deleteUserFailure,
      ),
      map((action) => {
        return UIControlActions.showToast({
          toast: {
            type: 'error',
            message: `Erro: ${action.error}`,
            duration: 5000,
          },
        });
      }),
    ),
  );

  showToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UIControlActions.showToast),
        tap(({ toast }) => {
          this.snackBar.openFromComponent(ToastComponent, {
            data: toast,
            duration: toast.duration || 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['custom-snackbar', toast.type === 'success' ? 'success' : 'error'],
          });
        }),
      ),
    { dispatch: false },
  );
}
