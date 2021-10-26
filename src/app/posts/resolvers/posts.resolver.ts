import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';

import { PostsEntityService } from '~/posts/services/posts-entity.service';

@Injectable({
  providedIn: 'root',
})
export class PostsResolver implements Resolve<boolean> {
  constructor(private postsEntityService: PostsEntityService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return this.postsEntityService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.postsEntityService.getAll();
        }
      }),
      first(),
    );
  }
}
