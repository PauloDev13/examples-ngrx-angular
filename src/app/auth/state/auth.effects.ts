import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import { loginStart, loginSuccess } from '~/auth/state/auth.actions';
import { AuthService } from '~/services/auth.service';
import { TAppState } from '~/store/app.state';
import { setErrorMessage, setLoadingSpinner } from '~/store/shared/shared.actions';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        const { email, password } = action;
        return this.authService.login({ email, password }).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            const user = this.authService.formatUser(data);
            return loginSuccess({ user });
          }),
          catchError((errorResponse) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const message = this.authService.getErrorMessage(
              errorResponse.error.error.message,
            );
            return of(
              setErrorMessage({
                message,
              }),
            );
          }),
        );
      }),
    );
  });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<TAppState>,
  ) {}
}
