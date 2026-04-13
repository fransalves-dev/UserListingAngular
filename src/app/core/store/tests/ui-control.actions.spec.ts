import { UITheme } from "../../models/theme.model";
import { Toast } from "../../models/toast.model";
import { UIControlActions } from "../ui-control.actions";

describe('UIControlActions', () => {
  it('should create Set Theme action', () => {
    const action = UIControlActions.setTheme({
      theme: 'dark' as UITheme,
    });

    expect(action.type).toBe('[UI Control] Set Theme');
    expect(action.theme).toBe('dark');
  });

  it('should create Show Toast action', () => {
    const toast = {
      message: 'Hello',
      type: 'success',
    } as Toast;

    const action = UIControlActions.showToast({ toast });

    expect(action.type).toBe('[UI Control] Show Toast');
    expect(action.toast).toEqual(toast);
  });
});