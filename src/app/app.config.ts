import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { uiControlReducer } from './core/store/ui-control.reducer';
import { UIControlEffects } from './core/store/ui-control.effects';
import { usersReducer } from './users/store/users.reducer';
import { UsersEffects } from './users/store/users.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore({
      uiControl: uiControlReducer,
      users: usersReducer,
    }),
    provideEffects([UIControlEffects, UsersEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
