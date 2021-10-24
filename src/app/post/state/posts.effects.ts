import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import { TPosts } from '~/interfaces/post.interface';
import {
  addPost,
  addSuccessPost,
  deletePost,
  deleteSuccessPost,
  loadPosts,
  loadSuccessPosts,
  updatePost,
  updateSuccessPost,
} from '~/post/state/posts.actions';
import { AuthService } from '~/services/auth.service';
import { PostsService } from '~/services/posts.service';
import { TAppState } from '~/store/app.state';
import {
  setEmptyTable,
  setErrorMessage,
  setLoadingSpinner,
} from '~/store/shared/shared.actions';

@Injectable()
export class PostsEffects {
  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPosts),
      exhaustMap(() => {
        return this.postsService.getPosts().pipe(
          map((posts: TPosts) => {
            if (posts.length === 0) {
              this.store.dispatch(setEmptyTable({ status: false }));
            } else {
              this.store.dispatch(setEmptyTable({ status: true }));
            }
            return loadSuccessPosts({ posts });
          }),
          // catchError((errResponse) => {
          //   const message = this.authService.getErrorMessage(errResponse.error.error);
          //   return of(
          //     setErrorMessage({
          //       message,
          //     }),
          //   );
          // }),
        );
      }),
    );
  });

  addPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPost),
      exhaustMap((action) => {
        return this.postsService.addPost(action.post).pipe(
          map((data) => {
            const post = { ...action.post, id: data.name };
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setEmptyTable({ status: true }));
            return addSuccessPost({ post });
          }),
          catchError((errResponse) => {
            const message = this.authService.getErrorMessage(
              errResponse.error.error.message,
            );
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setEmptyTable({ status: false }));
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

  updatePosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatePost),
      exhaustMap((action) => {
        return this.postsService.updatePost(action.post).pipe(
          map(() => {
            return updateSuccessPost({ post: action.post });
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

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletePost),
      exhaustMap((action) => {
        return this.postsService.deletePost(action.id).pipe(
          map(() => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setEmptyTable({ status: false }));
            return deleteSuccessPost({ id: action.id });
          }),
          catchError((errResponse) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setEmptyTable({ status: false }));
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
    private store: Store<TAppState>,
  ) {}
}
