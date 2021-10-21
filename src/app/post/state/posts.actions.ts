import { createAction, props } from '@ngrx/store';

import {
  ADD_POST_ACTION,
  DELETE_POST_ACTION,
  IPost,
  LOAD_POSTS_ACTION,
  ADD_SUCCESS_POST,
  SUCCESS_POSTS_ACTION,
  UPDATE_POST_ACTION,
} from '~/interfaces/post.interface';

export const addPost = createAction(ADD_POST_ACTION, props<{ post: IPost }>());
export const addSuccessPost = createAction(ADD_SUCCESS_POST, props<{ post: IPost }>());
export const updatePost = createAction(UPDATE_POST_ACTION, props<{ post: IPost }>());
export const deletePost = createAction(DELETE_POST_ACTION, props<{ post: IPost }>());
export const loadPosts = createAction(LOAD_POSTS_ACTION);
export const loadSuccessPosts = createAction(
  SUCCESS_POSTS_ACTION,
  props<{ posts: IPost[] }>(),
);
