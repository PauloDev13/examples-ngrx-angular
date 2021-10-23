import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { selectIsAuthenticated } from '~/auth/state/auth.selectors';
import { TAppState } from '~/store/app.state';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<TAppState>, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(selectIsAuthenticated).pipe(
      map((isAuthenticated) => {
        if (!isAuthenticated) {
          return this.router.createUrlTree(['auth']);
        }
        return true;
      }),
    );
  }
}
