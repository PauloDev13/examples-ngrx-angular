import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import { loginFail, loginStart, loginSuccess } from '~/auth/state/auth.actions';
import { AuthService } from '~/services/auth.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        const { email, password } = action;
        return this.authService.login({ email, password }).pipe(
          map(() => {
            return loginSuccess();
          }),
          catchError(() => of(loginFail())),
        );
      }),
    );
  });

  constructor(private actions$: Actions, private authService: AuthService) {}
}
