import { createAction, props } from '@ngrx/store';

import { IPost } from '~/interfaces/post.interface';

export const addPost = createAction('[post] Create Post', props<{ post: IPost }>());
export const updatePost = createAction('[post] Update Post', props<{ post: IPost }>());
export const deletePost = createAction('[post] Delete Post', props<{ post: IPost }>());
