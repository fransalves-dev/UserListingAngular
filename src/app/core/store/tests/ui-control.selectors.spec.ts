import { selectUIState, selectTheme, selectToast } from "../ui-control.selectors";
import { UIControlState } from "../ui-control.state";

describe('UIControl Selectors', () => {
  const mockState = {
    uiControl: {
      theme: 'dark',
      toast: {
        type: 'success',
        message: 'ok',
      },
    },
  } as unknown as { uiControl: UIControlState };

  it('should select UI state', () => {
    const result = selectUIState(mockState);
    expect(result).toEqual(mockState.uiControl);
  });

  it('should select theme', () => {
    const result = selectTheme.projector(mockState.uiControl);
    expect(result).toBe('dark');
  });

  it('should select toast', () => {
    const result = selectToast.projector(mockState.uiControl);
    expect(result).toEqual({
      type: 'success',
      message: 'ok',
    });
  });
});