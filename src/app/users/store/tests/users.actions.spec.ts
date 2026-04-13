import { User } from "../../models/user.model";
import { UsersActions } from "../users.actions";

describe('UsersActions', () => {
  const mockUser: User = {
    id: 1,
    name: 'John',
    email: 'john@test.com',
    phone: '123',
    cpf: '000',
    typeOfPhone: null,
  };

  it('should create Load Users action', () => {
    const action = UsersActions.loadUsers();

    expect(action.type).toBe('[Users] Load Users');
  });

  it('should create Load Users Success action', () => {
    const action = UsersActions.loadUsersSuccess({
      users: [mockUser],
    });

    expect(action.type).toBe('[Users] Load Users Success');
    expect(action.users).toEqual([mockUser]);
  });

  it('should create Load Users Failure action', () => {
    const action = UsersActions.loadUsersFailure({
      error: 'error',
    });

    expect(action.type).toBe('[Users] Load Users Failure');
    expect(action.error).toBe('error');
  });

  it('should create Add User action', () => {
    const action = UsersActions.addUser({
      user: {
        name: 'John',
        email: 'john@test.com',
        phone: '123',
        cpf: '000',
        typeOfPhone: null,
      },
    });

    expect(action.type).toBe('[Users] Add User');
    expect(action.user.name).toBe('John');
  });

  it('should create Add User Success action', () => {
    const action = UsersActions.addUserSuccess({
      user: mockUser,
    });

    expect(action.type).toBe('[Users] Add User Success');
    expect(action.user).toEqual(mockUser);
  });

  it('should create Add User Failure action', () => {
    const action = UsersActions.addUserFailure({
      error: 'error',
    });

    expect(action.type).toBe('[Users] Add User Failure');
  });

  it('should create Update User action', () => {
    const action = UsersActions.updateUser({
      id: 1,
      user: { name: 'Updated' },
    });

    expect(action.type).toBe('[Users] Update User');
    expect(action.id).toBe(1);
    expect(action.user.name).toBe('Updated');
  });

  it('should create Update User Success action', () => {
    const action = UsersActions.updateUserSuccess({
      user: mockUser,
    });

    expect(action.type).toBe('[Users] Update User Success');
    expect(action.user).toEqual(mockUser);
  });

  it('should create Update User Failure action', () => {
    const action = UsersActions.updateUserFailure({
      error: 'error',
    });

    expect(action.error).toBe('error');
  });

  it('should create Delete User action', () => {
    const action = UsersActions.deleteUser({
      id: 1,
    });

    expect(action.type).toBe('[Users] Delete User');
    expect(action.id).toBe(1);
  });

  it('should create Delete User Success action', () => {
    const action = UsersActions.deleteUserSuccess({
      id: 1,
    });

    expect(action.type).toBe('[Users] Delete User Success');
    expect(action.id).toBe(1);
  });

  it('should create Delete User Failure action', () => {
    const action = UsersActions.deleteUserFailure({
      error: 'error',
    });

    expect(action.type).toBe('[Users] Delete User Failure');
    expect(action.error).toBe('error');
  });
});