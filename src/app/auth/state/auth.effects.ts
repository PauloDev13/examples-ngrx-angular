import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';

import {
  autoLogin,
  loginStart,
  loginSuccess,
  logoutAction,
  signupStart,
  signupSuccess,
} from '~/auth/state/auth.actions';
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
            this.authService.setUserLocalStorage(user);
            return loginSuccess({ user, redirect: true });
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

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStart),
      exhaustMap((action) => {
        const { email, password } = action;
        return this.authService.signup({ email, password }).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            const user = this.authService.formatUser(data);
            this.authService.setUserLocalStorage(user);
            return signupSuccess({ user, redirect: true });
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

  loginAnSignupRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginSuccess, signupSuccess]),
        tap((action) => {
          if (action.redirect) {
            this.router.navigate(['/']).then();
          }
        }),
      );
    },
    { dispatch: false },
  );

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap(() => {
        const user = this.authService.getUserFromLocalStorage();
        return of(loginSuccess({ user, redirect: false }));
      }),
    );
  });

  logoutAction$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logoutAction),
        map(() => {
          this.authService.logout();
          this.router.navigate(['/auth']).then();
        }),
      );
    },
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<TAppState>,
    private router: Router,
  ) {}
}
