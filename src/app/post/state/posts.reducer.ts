import { Action, createReducer, on } from '@ngrx/store';

import { getPosts } from './posts.actions';
import { initialState, TPostsState } from './posts.state';

const _postsReducer = createReducer(
  initialState,
  on(getPosts, (state): TPostsState => {
    return {
      ...state,
      posts: state.posts,
    };
  }),
);

export const postsReducer = (state = initialState, action: Action) => {
  return _postsReducer(state, action);
};
