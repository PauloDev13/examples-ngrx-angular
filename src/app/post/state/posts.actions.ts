import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import {
  ADD_POST_ACTION,
  DELETE_POST_ACTION,
  TPost,
  LOAD_POSTS_ACTION,
  ADD_SUCCESS_POST,
  SUCCESS_POSTS_ACTION,
  UPDATE_POST_ACTION,
  UPDATE_SUCCESS_POST,
  DELETE_SUCCESS_POST,
} from '~/interfaces/post.interface';

export const loadPosts = createAction(LOAD_POSTS_ACTION);
export const loadSuccessPosts = createAction(
  SUCCESS_POSTS_ACTION,
  props<{ posts: TPost[] }>(),
);

export const addPost = createAction(ADD_POST_ACTION, props<{ post: TPost }>());
export const addSuccessPost = createAction(ADD_SUCCESS_POST, props<{ post: TPost }>());

export const updatePost = createAction(UPDATE_POST_ACTION, props<{ post: TPost }>());
export const updateSuccessPost = createAction(
  UPDATE_SUCCESS_POST,
  props<{ post: Update<TPost> }>(),
);
export const deletePost = createAction(
  DELETE_POST_ACTION,
  props<{ id: string | undefined }>(),
);
export const deleteSuccessPost = createAction(
  DELETE_SUCCESS_POST,
  props<{ id: string | undefined }>(),
);
