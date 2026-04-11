import { User } from "../models/user.model";

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
};

export const initialUsersState: UsersState = {
  users: [],
  loading: false,
  error: null,
};