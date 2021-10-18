import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TPostsState } from './posts.state';

const selectPostsState = createFeatureSelector<TPostsState>('posts');
export const selectPosts = createSelector(selectPostsState, (state: TPostsState) => {
  return state.posts;
});

export const selectPostById = createSelector(
  selectPostsState,
  (state: TPostsState, props: { id: string }) =>
    state.posts.find((post) => post.id === props.id),
);

export const selectPostByIdMulti = (props: { id: string }) =>
  createSelector(selectPostsState, (state: TPostsState) =>
    state.posts.find((post) => post.id === props.id),
  );
