import { createEntityAdapter, EntityState } from '@ngrx/entity';

import { TPost } from '~/interfaces/post.interface';

export interface IPostsState extends EntityState<TPost> {
  // post: TPost;
}

export const postsAdapter = createEntityAdapter<TPost>();

export const initialState: IPostsState = postsAdapter.getInitialState();

// export type TPostsState = {
//   posts: TPost[];
// };

// export const initialState: TPostsState = {
//   posts: [],
// };
