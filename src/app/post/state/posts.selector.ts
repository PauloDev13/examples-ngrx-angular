import { createFeatureSelector, createSelector } from '@ngrx/store';

import { POSTS_STATE_NAME } from '~/interfaces/post.interface';

import { TPostsState } from './posts.state';

const selectPostsState = createFeatureSelector<TPostsState>(POSTS_STATE_NAME);

export const selectPosts = createSelector(selectPostsState, (state: TPostsState) => {
  return state.posts;
});

export const selectPostByIdProps = (props: { id: string }) =>
  createSelector(selectPostsState, (state: TPostsState) =>
    state.posts.find((post) => post.id === props.id),
  );
