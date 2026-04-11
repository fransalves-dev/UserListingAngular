import { createReducer, on } from '@ngrx/store';
import { UsersActions } from './users.actions';
import { initialUsersState } from './users.state';

export const usersReducer = createReducer(
  initialUsersState, on(UsersActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UsersActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
    error: null,
  })),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(UsersActions.addUserSuccess, (state, { user }) => ({
    ...state,
    users: [user, ...state.users],
  })),
  on(UsersActions.addUserFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(UsersActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map((u) =>
      u.id === user.id ? user : u
    ),
  })),
  on(UsersActions.updateUserFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(UsersActions.deleteUserSuccess, (state, { id }) => ({
    ...state,
    users: state.users.filter((u) => u.id !== id),
  })),
  on(UsersActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);