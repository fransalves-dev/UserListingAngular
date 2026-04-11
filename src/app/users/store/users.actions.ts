import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "../models/user.model";

export const UsersActions = createActionGroup({
  source: "Users",
  events: {
    "Load Users": emptyProps(),
    "Load Users Success": props<{ users: User[] }>(),
    "Load Users Failure": props<{ error: string }>(),

    "Add User": props<{user: Omit<User, "id">}>(),
    "Add User Success": props<{ user: User }>(),
    "Add User Failure": props<{ error: string }>(),

    "Update User": props<{ id: number; user: Partial<User> }>(),
    "Update User Success": props<{ user: User }>(),
    "Update User Failure": props<{ error: string }>(),

    "Delete User": props<{ id: number }>(),
    "Delete User Success": props<{ id: number }>(),
    "Delete User Failure": props<{ error: string }>(),
  },
});