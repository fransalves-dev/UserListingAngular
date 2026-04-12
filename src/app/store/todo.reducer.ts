import { createReducer, on } from "@ngrx/store";
import { initialState } from "./todo.state";
import { TodosActions } from "./todo.actions";

export const todoReducer = createReducer(
  initialState,
  
  on(TodosActions.loadTodos, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TodosActions.loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    loading: false,
  })),

  on(TodosActions.loadTodosError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(TodosActions.toggleTodoComplete, (state, { id }) => ({
    ...state,
    todos: state.todos.map((todo) =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    ),
  }))
);