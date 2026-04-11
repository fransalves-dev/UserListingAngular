import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UIControlState } from './ui-control.state';

export const selectUIState =
  createFeatureSelector<UIControlState>('uiControl');

export const selectTheme = createSelector(
  selectUIState,
  (state) => state.theme
);

export const selectToast = createSelector(
  selectUIState,
  (state) => state.toast
);