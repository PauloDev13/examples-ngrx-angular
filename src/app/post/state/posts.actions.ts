import { createAction, props } from '@ngrx/store';

import { TPostsState } from './posts.state';

export const getPosts = createAction(
  '[posts] Get All Posts',
  props<{ posts: TPostsState }>(),
);
