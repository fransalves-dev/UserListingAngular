import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIControlEffects } from '../ui-control.effects';
import { UsersActions } from '../../../users/store/users.actions';
import { UIControlActions } from '../ui-control.actions';
import { Toast } from '../../models/toast.model';

describe('UIControlEffects', () => {
  let actions$: Observable<unknown>;
  let effects: UIControlEffects;

  const snackBarMock: Pick<MatSnackBar, 'openFromComponent'> = {
    openFromComponent: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UIControlEffects,
        provideMockActions(() => actions$),
        { provide: MatSnackBar, useValue: snackBarMock },
      ],
    });

    effects = TestBed.inject(UIControlEffects);
  });

  it('should map addUserSuccess to success toast', (done) => {
    actions$ = of(
      UsersActions.addUserSuccess({
        user: {
          id: 1,
          name: 'Test',
          email: 'test@test.com',
          phone: '123',
          cpf: '000',
          typeOfPhone: null,
        },
      }),
    );

    effects.showSuccessToast$.subscribe((action) => {
      expect(action).toEqual(
        UIControlActions.showToast({
          toast: {
            type: 'success',
            message: 'Usuário criado com sucesso!',
          },
        }),
      );
      done();
    });
  });

  it('should map updateUserSuccess to success toast', (done) => {
    actions$ = of(
      UsersActions.updateUserSuccess({
        user: {
          id: 1,
          name: 'Test',
          email: 'test@test.com',
          phone: '123',
          cpf: '000',
          typeOfPhone: null,
        },
      }),
    );

    effects.showSuccessToast$.subscribe((action) => {
      expect(action.toast.message).toBe('Usuário atualizado com sucesso!');
      done();
    });
  });

  it('should map deleteUserSuccess to success toast', (done) => {
    actions$ = of(UsersActions.deleteUserSuccess({ id: 1 }));

    effects.showSuccessToast$.subscribe((action) => {
      expect(action.toast.message).toBe('Usuário deletado com sucesso!');
      done();
    });
  });

  it('should map failure actions to error toast', (done) => {
    const error = 'fail';

    actions$ = of(UsersActions.addUserFailure({ error }));

    effects.showErrorToast$.subscribe((action) => {
      expect(action.toast.type).toBe('error');
      expect(action.toast.message).toBe(`Erro: ${error}`);
      expect(action.toast.duration).toBe(5000);
      done();
    });
  });

  it('should call snackbar when showToast action is dispatched', (done) => {
    const toast: Toast = {
      type: 'success',
      message: 'OK',
    };

    actions$ = of(UIControlActions.showToast({ toast }));

    effects.showToast$.subscribe(() => {
      expect(snackBarMock.openFromComponent).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          data: toast,
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['custom-snackbar', 'success'],
        }),
      );
      done();
    });
  });
});
