import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { ROUTER_NAVIGATION, RouterNavigatedAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, filter, map, switchMap } from 'rxjs/operators';

import { dummyAction } from '~/auth/state/auth.actions';
import { TPost, TPosts } from '~/interfaces/post.interface';
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
import { selectPosts } from '~/post/state/posts.selector';
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
      concatLatestFrom(() => this.store.select(selectPosts)),
      exhaustMap(([_, posts]) => {
        if (!posts.length || posts.length === 1) {
          return this.postsService.getPosts().pipe(
            map((posts: TPosts) => {
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
        }
        return of(dummyAction());
      }),
    );
  });

  getSinglePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => {
        return r.payload.routerState.url.startsWith('/posts/detail');
      }),
      map((r: RouterNavigatedAction | any) => {
        return r.payload.routerState['params']['id'];
      }),
      concatLatestFrom(() => this.store.select(selectPosts)),
      switchMap(([_, posts]) => {
        if (!posts.length) {
          return this.postsService.getPosts().pipe(
            map((post) => {
              // const postData = [{ ...post, id }];
              return loadSuccessPosts({ posts: post });
            }),
          );
        }
        return of(dummyAction());
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
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const updatedPost: Update<TPost> = {
              id: action.post.id as string,
              changes: {
                ...action.post,
              },
            };
            return updateSuccessPost({ post: updatedPost });
          }),
          catchError((errResponse) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
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
            // this.store.dispatch(setEmptyTable({ status: false }));
            this.store.dispatch(loadPosts());
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
