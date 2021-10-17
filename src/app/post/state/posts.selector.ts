import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TPostsState } from './posts.state';

const selectPostsState = createFeatureSelector<TPostsState>('posts');
export const selectPosts = createSelector(selectPostsState, (state: TPostsState) => {
  return state.posts;
});
