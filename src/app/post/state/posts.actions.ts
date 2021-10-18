import { createAction, props } from '@ngrx/store';

import { IPost } from '../../interfaces/post.interface';
// import { TPostsState } from './posts.state';

// export const getPosts = createAction(
//   '[posts] Get All Posts',
//   props<{ posts: TPostsState }>(),
// );

export const addPost = createAction('[post] Create Post', props<{ post: IPost }>());
