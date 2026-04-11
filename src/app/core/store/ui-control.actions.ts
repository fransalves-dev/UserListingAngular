import { createActionGroup, props } from "@ngrx/store";
import { UITheme } from "../models/theme.model";
import { Toast } from "../models/toast.model";

export const UIControlActions = createActionGroup({
  source: "UI Control",
  events: {
    "Set Theme": props<{theme: UITheme}>(),
    "Show Toast": props<{toast: Toast}>(),
  },
});