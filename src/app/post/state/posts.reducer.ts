import { Action, createReducer, on } from '@ngrx/store';

import {
  addSuccessPost,
  deleteSuccessPost,
  loadSuccessPosts,
  updateSuccessPost,
} from './posts.actions';
import { initialState, IPostsState, postsAdapter } from './posts.state';

const _postsReducer = createReducer(
  initialState,
  on(loadSuccessPosts, (state, action): IPostsState => {
    return postsAdapter.setAll(action.posts, state);
    // return {
    //   ...state,
    //   posts: action.posts,
    // };
  }),
  on(addSuccessPost, (state, action): IPostsState => {
    return postsAdapter.addOne(action.post, state);
    // let post = { ...action.post };
    //
    // return {
    //   ...state,
    //   posts: [...state.posts, post],
    // };
  }),

  on(updateSuccessPost, (state, action): IPostsState => {
    return postsAdapter.updateOne(action.post, state);
    // const updatedPost = state.posts.map((post) => {
    //   return action.post.id === post.id ? action.post : post;
    // });
    //
    // return {
    //   ...state,
    //   posts: updatedPost,
    // };
  }),

  on(deleteSuccessPost, (state, action): IPostsState => {
    return postsAdapter.removeOne(action.id!, state);
    // const deletedPost = state.posts.filter((post) => {
    //   return post.id !== action.id;
    // });
    //
    // return {
    //   ...state,
    //   posts: deletedPost,
    // };
  }),
);

export const postsReducer = (state = initialState, action: Action) => {
  return _postsReducer(state, action);
};
