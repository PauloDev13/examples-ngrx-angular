import { Action, createReducer, on } from '@ngrx/store';

import {
  addSuccessPost,
  deletePost,
  loadSuccessPosts,
  updatePost,
} from './posts.actions';
import { initialState, TPostsState } from './posts.state';

const _postsReducer = createReducer(
  initialState,
  on(loadSuccessPosts, (state, action): TPostsState => {
    return {
      ...state,
      posts: action.posts,
    };
  }),
  on(addSuccessPost, (state, action): TPostsState => {
    let post = { ...action.post };

    return {
      ...state,
      posts: [...state.posts, post],
    };
  }),

  on(updatePost, (state, action): TPostsState => {
    const updatedPost = state.posts.map((post) => {
      return action.post.id === post.id ? action.post : post;
    });

    return {
      ...state,
      posts: updatedPost,
    };
  }),

  on(deletePost, (state, action): TPostsState => {
    const updatedPost = state.posts.filter((post) => {
      return post.id !== action.post.id;
    });

    return {
      ...state,
      posts: updatedPost,
    };
  }),
);

export const postsReducer = (state = initialState, action: Action) => {
  return _postsReducer(state, action);
};
