import { User } from "../../models/user.model";
import { UsersActions } from "../users.actions";
import { initialUsersState } from "../users.state";
import { usersReducer } from "../users.reducer";

describe('usersReducer', () => {
  const mockUser: User = {
    id: 1,
    name: 'John',
    email: 'john@test.com',
    phone: '123',
    cpf: '000',
    typeOfPhone: null,
  };

  it('should return initial state', () => {
    const state = usersReducer(undefined, { type: 'unknown' });

    expect(state).toBe(initialUsersState);
  });


  it('should set loading true on loadUsers', () => {
    const state = usersReducer(
      initialUsersState,
      UsersActions.loadUsers(),
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should set users on loadUsersSuccess', () => {
    const state = usersReducer(
      initialUsersState,
      UsersActions.loadUsersSuccess({ users: [mockUser] }),
    );

    expect(state.users).toEqual([mockUser]);
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
      UsersActions.addUserSuccess({ user: mockUser }),
    );

    expect(state.users).toEqual([mockUser]);
  });

  it('should set error on addUserFailure', () => {
    const state = usersReducer(
      initialUsersState,
      UsersActions.addUserFailure({ error: 'fail' }),
    );

    expect(state.error).toBe('fail');
  });

  
  it('should update user on success', () => {
    const initialState = {
      ...initialUsersState,
      users: [mockUser],
    };

    const updatedUser = { ...mockUser, name: 'Updated' };

    const state = usersReducer(
      initialState,
      UsersActions.updateUserSuccess({ user: updatedUser }),
    );

    expect(state.users[0].name).toBe('Updated');
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
      users: [mockUser],
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