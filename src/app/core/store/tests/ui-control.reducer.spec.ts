import { UITheme } from "../../models/theme.model";
import { Toast } from "../../models/toast.model";
import { UIControlActions } from "../ui-control.actions";
import {uiControlReducer} from "../ui-control.reducer";
import { initialUIControlState } from "../ui-control.state";

describe('uiControlReducer', () => {
  it('should return initial state', () => {
    const state = uiControlReducer(undefined, { type: 'unknown' });

    expect(state).toBe(initialUIControlState);
  });

  it('should set theme', () => {
    const theme: UITheme = 'dark' as UITheme;

    const state = uiControlReducer(
      initialUIControlState,
      UIControlActions.setTheme({ theme }),
    );

    expect(state).toEqual({
      ...initialUIControlState,
      theme,
    });
  });

  it('should set toast', () => {
    const toast: Toast = {
      type: 'success',
      message: 'ok',
    };

    const state = uiControlReducer(
      initialUIControlState,
      UIControlActions.showToast({ toast }),
    );

    expect(state).toEqual({
      ...initialUIControlState,
      toast,
    });
  });
});