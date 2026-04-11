import { UITheme } from "../models/theme.model";
import { Toast } from "../models/toast.model";

export interface UIControlState {
  theme: UITheme;
  toast: Toast | null;
}

export const initialUIControlState: UIControlState = {
  theme: 'light',
  toast: null,
};