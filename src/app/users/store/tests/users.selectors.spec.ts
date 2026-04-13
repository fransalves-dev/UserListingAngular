import { User } from "../../models/user.model";
import { UsersState } from "../users.state";
import {
  selectUsersState,
  selectUsers,
  selectUsersLoading,
  selectUsersError,
  selectUsersViewModel,
} from '../users.selectors';

describe('Users Selectors', () => {
  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@test.com',
    phone: '123',
    cpf: '000',
    typeOfPhone: null,
  };

  const mockState: { users: UsersState } = {
    users: {
      users: [mockUser],
      loading: false,
      error: null,
    },
  };

  // ----------------------------
  // FEATURE SELECTOR
  // ----------------------------
  it('should select users state', () => {
    const result = selectUsersState(mockState);
    expect(result).toEqual(mockState.users);
  });

  // ----------------------------
  // SIMPLE SELECTORS
  // ----------------------------
  it('should select users list', () => {
    const result = selectUsers.projector(mockState.users);
    expect(result).toEqual([mockUser]);
  });

  it('should select loading', () => {
    const result = selectUsersLoading.projector(mockState.users);
    expect(result).toBe(false);
  });

  it('should select error', () => {
    const result = selectUsersError.projector(mockState.users);
    expect(result).toBeNull();
  });

  // ----------------------------
  // VIEW MODEL (FACTORY SELECTOR)
  // ----------------------------
  it('should return filtered users when term matches', () => {
    const selector = selectUsersViewModel('john');

    const result = selector.projector(
      [mockUser],
      false,
      null,
    );

    expect(result).toEqual({
      users: [mockUser],
      loading: false,
      error: null,
      isEmpty: false,
    });
  });

  it('should return empty filter when term does not match', () => {
    const selector = selectUsersViewModel('xpto');

    const result = selector.projector(
      [mockUser],
      false,
      null,
    );

    expect(result).toEqual({
      users: [],
      loading: false,
      error: null,
      isEmpty: true,
    });
  });

  it('should return all users when term is empty', () => {
    const selector = selectUsersViewModel('');

    const result = selector.projector(
      [mockUser],
      false,
      null,
    );

    expect(result.users).toEqual([mockUser]);
    expect(result.isEmpty).toBe(false);
  });
});