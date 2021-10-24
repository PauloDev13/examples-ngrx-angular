import { TPost } from '~/interfaces/post.interface';

export type TPostsState = {
  posts: TPost[];
};

export const initialState: TPostsState = {
  posts: [],
};
