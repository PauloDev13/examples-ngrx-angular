import { createAction, props } from '@ngrx/store';

import {
  CREATE_POST,
  DELETE_POST,
  IPost,
  UPDATE_POST,
} from '~/interfaces/post.interface';

export const addPost = createAction(CREATE_POST, props<{ post: IPost }>());
export const updatePost = createAction(UPDATE_POST, props<{ post: IPost }>());
export const deletePost = createAction(DELETE_POST, props<{ post: IPost }>());
