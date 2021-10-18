import { createFeatureSelector, createSelector } from '@ngrx/store';

import { POSTS_STATE_NAME } from '~/interfaces/post.interface';

import { TPostsState } from './posts.state';

const selectPostsState = createFeatureSelector<TPostsState>(POSTS_STATE_NAME);
export const selectPosts = createSelector(selectPostsState, (state: TPostsState) => {
  return state.posts;
});

export const selectPostById = createSelector(
  selectPostsState,
  (state: TPostsState, props: { id: string }) =>
    state.posts.find((post) => post.id === props.id),
);

export const selectPostByIdProps = (props: { id: string }) =>
  createSelector(selectPostsState, (state: TPostsState) =>
    state.posts.find((post) => post.id === props.id),
  );
