import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { UsersEffects } from '../users.effects';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';
import { UsersActions } from '../users.actions';

describe('UsersEffects', () => {
  let actions$: Observable<unknown>;
  let effects: UsersEffects;

  const usersServiceMock: jest.Mocked<UsersService> = {
    getUsers: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  } as any;

  const mockUser: User = {
    id: 1,
    name: 'John',
    email: 'john@test.com',
    phone: '123',
    cpf: '000',
    typeOfPhone: null,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersEffects,
        provideMockActions(() => actions$),
        { provide: UsersService, useValue: usersServiceMock },
      ],
    });

    effects = TestBed.inject(UsersEffects);
  });

  it('should return loadUsersSuccess on success', (done) => {
    usersServiceMock.getUsers.mockReturnValue(of([mockUser]));

    actions$ = of(UsersActions.loadUsers());

    effects.loadUsers$.subscribe((action) => {
      expect(action).toEqual(
        UsersActions.loadUsersSuccess({ users: [mockUser] }),
      );
      done();
    });
  });

  it('should return loadUsersFailure on error', (done) => {
    usersServiceMock.getUsers.mockReturnValue(
      throwError(() => new Error('fail')),
    );

    actions$ = of(UsersActions.loadUsers());

    effects.loadUsers$.subscribe((action) => {
      expect(action).toEqual(
        UsersActions.loadUsersFailure({ error: 'fail' }),
      );
      done();
    });
  });

  it('should return addUserSuccess', (done) => {
    const newUser = mockUser;

    usersServiceMock.createUser.mockReturnValue(of(newUser));

    actions$ = of(
      UsersActions.addUser({
        user: {
          name: 'John',
          email: 'john@test.com',
          phone: '123',
          cpf: '000',
          typeOfPhone: null,
        },
      }),
    );

    effects.addUser$.subscribe((action) => {
      expect(action).toEqual(
        UsersActions.addUserSuccess({ user: newUser }),
      );
      done();
    });
  });

  it('should return addUserFailure', (done) => {
    usersServiceMock.createUser.mockReturnValue(
      throwError(() => new Error('fail')),
    );

    actions$ = of(
      UsersActions.addUser({
        user: {
          name: 'John',
          email: 'john@test.com',
          phone: '123',
          cpf: '000',
          typeOfPhone: null,
        },
      }),
    );

    effects.addUser$.subscribe((action) => {
      expect(action).toEqual(
        UsersActions.addUserFailure({ error: 'fail' }),
      );
      done();
    });
  });


  it('should return updateUserSuccess', (done) => {
    usersServiceMock.updateUser.mockReturnValue(of(mockUser));

    actions$ = of(
      UsersActions.updateUser({
        id: 1,
        user: { name: 'Updated' },
      }),
    );

    effects.updateUser$.subscribe((action) => {
      expect(action).toEqual(
        UsersActions.updateUserSuccess({ user: mockUser }),
      );
      done();
    });
  });

  it('should return updateUserFailure', (done) => {
    usersServiceMock.updateUser.mockReturnValue(
      throwError(() => new Error('fail')),
    );

    actions$ = of(
      UsersActions.updateUser({
        id: 1,
        user: { name: 'Updated' },
      }),
    );

    effects.updateUser$.subscribe((action) => {
      expect(action).toEqual(
        UsersActions.updateUserFailure({ error: 'fail' }),
      );
      done();
    });
  });

  it('should return deleteUserSuccess', (done) => {
    usersServiceMock.deleteUser.mockReturnValue(of(void 0));

    actions$ = of(
      UsersActions.deleteUser({ id: 1 }),
    );

    effects.deleteUser$.subscribe((action) => {
      expect(action).toEqual(
        UsersActions.deleteUserSuccess({ id: 1 }),
      );
      done();
    });
  });

  it('should return deleteUserFailure', (done) => {
    usersServiceMock.deleteUser.mockReturnValue(
      throwError(() => new Error('fail')),
    );

    actions$ = of(
      UsersActions.deleteUser({ id: 1 }),
    );

    effects.deleteUser$.subscribe((action) => {
      expect(action).toEqual(
        UsersActions.deleteUserFailure({ error: 'fail' }),
      );
      done();
    });
  });
});