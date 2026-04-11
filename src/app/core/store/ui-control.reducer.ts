import { createReducer, on } from '@ngrx/store';
import { UIControlActions } from './ui-control.actions';
import { initialUIControlState } from './ui-control.state';

export const uiControlReducer = createReducer(
  initialUIControlState,

  on(UIControlActions.setTheme, (state, { theme }) => ({
    ...state,
    theme,
  })),

  on(UIControlActions.showToast, (state, { toast }) => ({
    ...state,
    toast,
  }))
);