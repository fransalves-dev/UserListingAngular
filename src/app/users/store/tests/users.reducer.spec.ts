import { User } from '../../models/user.model';
import { UsersActions } from '../users.actions';
import { initialUsersState } from '../users.state';
import { usersReducer } from '../users.reducer';

describe('usersReducer', () => {
  const user1: User = {
    id: 1,
    name: 'John',
    email: 'john@test.com',
    phone: '123',
    cpf: '000',
    typeOfPhone: null,
  };

  const user2: User = {
    id: 2,
    name: 'Mary',
    email: 'mary@test.com',
    phone: '456',
    cpf: '111',
    typeOfPhone: null,
  };

  it('should return initial state', () => {
    const state = usersReducer(undefined, { type: 'unknown' } as any);
    expect(state).toBe(initialUsersState);
  });

  it('should set loading true on loadUsers', () => {
    const state = usersReducer(initialUsersState, UsersActions.loadUsers());

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should set users on loadUsersSuccess', () => {
    const state = usersReducer(
      initialUsersState,
      UsersActions.loadUsersSuccess({ users: [user1] }),
    );

    expect(state.users).toEqual([user1]);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should set error on loadUsersFailure', () => {
    const state = usersReducer(
      initialUsersState,
      UsersActions.loadUsersFailure({ error: 'fail' }),
    );

    expect(state.error).toBe('fail');
    expect(state.loading).toBe(false);
  });

  it('should add user on success', () => {
    const state = usersReducer(
      { ...initialUsersState, users: [] },
      UsersActions.addUserSuccess({ user: user1 }),
    );

    expect(state.users).toEqual([user1]);
  });

  it('should set error on addUserFailure', () => {
    const state = usersReducer(
      initialUsersState,
      UsersActions.addUserFailure({ error: 'fail' }),
    );

    expect(state.error).toBe('fail');
  });

  it('should update ONLY matching user (covers true branch)', () => {
    const initialState = {
      ...initialUsersState,
      users: [user1, user2],
    };

    const updatedUser = { ...user1, name: 'Updated' };

    const state = usersReducer(
      initialState,
      UsersActions.updateUserSuccess({ user: updatedUser }),
    );

    // branch TRUE (id match)
    expect(state.users[0].name).toBe('Updated');

    // sanity check
    expect(state.users[1]).toBe(user2);
  });

  it('should NOT modify non-matching users (covers false branch)', () => {
    const initialState = {
      ...initialUsersState,
      users: [user1, user2],
    };

    const updatedUser = { ...user1, name: 'Updated Again' };

    const state = usersReducer(
      initialState,
      UsersActions.updateUserSuccess({ user: updatedUser }),
    );

    // branch FALSE (id !== user.id)
    expect(state.users[1]).toBe(user2);
    expect(state.users[1].name).toBe('Mary');
  });

  it('should set error on updateUserFailure', () => {
    const state = usersReducer(
      initialUsersState,
      UsersActions.updateUserFailure({ error: 'fail' }),
    );

    expect(state.error).toBe('fail');
  });

  it('should remove user on deleteUserSuccess', () => {
    const initialState = {
      ...initialUsersState,
      users: [user1],
    };

    const state = usersReducer(
      initialState,
      UsersActions.deleteUserSuccess({ id: 1 }),
    );

    expect(state.users).toEqual([]);
  });

  it('should set error on deleteUserFailure', () => {
    const state = usersReducer(
      initialUsersState,
      UsersActions.deleteUserFailure({ error: 'fail' }),
    );

    expect(state.error).toBe('fail');
  });
});