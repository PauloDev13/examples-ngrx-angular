import { Action, createReducer, on } from '@ngrx/store';

import { addPost } from './posts.actions';
import { initialState, TPostsState } from './posts.state';

const _postsReducer = createReducer(
  initialState,
  // on(getPosts, (state): TPostsState => {
  //   return {
  //     ...state,
  //     posts: state.posts,
  //   };
  // }),

  on(addPost, (state, action): TPostsState => {
    let post = { ...action.post };
    post.id = (state.posts.length + 1).toString();

    return {
      ...state,
      posts: [...state.posts, post],
    };
  }),
);

export const postsReducer = (state = initialState, action: Action) => {
  return _postsReducer(state, action);
};
