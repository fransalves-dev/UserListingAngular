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

export const selectUsersViewModel = (term: string) =>
  createSelector(
    selectUsers,
    selectUsersLoading,
    selectUsersError,
    (users, loading, error) => {
      const filtered = term
        ? users.filter(u =>
            u.name.toLowerCase().includes(term.toLowerCase())
          )
        : users;

      return {
        users: filtered,
        loading,
        error,
        isEmpty: filtered.length === 0,
      };
    }
  );