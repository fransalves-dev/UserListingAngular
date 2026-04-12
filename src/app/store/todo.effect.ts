import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodosActions } from './todo.actions';
import { catchError, map, switchMap, of } from 'rxjs';
import { TodoService } from '../services/todo.service';

@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private todoService: TodoService
  ) {}

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.loadTodos),
      switchMap(() =>
        this.todoService.getTodos().pipe(
          map((todos) =>
            TodosActions.loadTodosSuccess({ todos })
          ),
          catchError((error) =>
            of(
              TodosActions.loadTodosError({
                error: error.message || 'Erro ao carregar',
              })
            )
          )
        )
      )
    )
  );
}