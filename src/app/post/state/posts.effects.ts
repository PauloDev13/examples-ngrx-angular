import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import {
  addPost,
  addSuccessPost,
  loadPosts,
  loadSuccessPosts,
} from '~/post/state/posts.actions';
import { AuthService } from '~/services/auth.service';
import { PostsService } from '~/services/posts.service';
import { setErrorMessage } from '~/store/shared/shared.actions';

@Injectable()
export class PostsEffects {
  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPosts),
      mergeMap(() => {
        return this.postsService.getPosts().pipe(
          map((posts) => {
            return loadSuccessPosts({ posts });
          }),
        );
      }),
    );
  });

  addPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        // const { title, description } = action.post;
        return this.postsService.addPost(action.post).pipe(
          map((data) => {
            const post = { ...action.post, id: data.name };
            return addSuccessPost({ post });
          }),
          catchError((errResponse) => {
            const message = this.authService.getErrorMessage(
              errResponse.error.error.message,
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
    private postsService: PostsService,
    private authService: AuthService,
  ) {}
}
