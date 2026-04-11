import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UsersState } from "./users.state";

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectUsers = createSelector(
  selectUsersState,
  (state) => state.users
);

export const selectUsersLoading = createSelector(
  selectUsersState,
  (state) => state.loading
);

export const selectUsersError = createSelector(
  selectUsersState,
  (state) => state.error
);

export const selectUsersViewModel = createSelector(
  selectUsers,
  selectUsersLoading,
  selectUsersError,
  (users, loading, error) => ({
    users,
    loading,
    error,
    isEmpty: users.length === 0,
  })
);