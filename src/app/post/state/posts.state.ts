import { IPost } from '~/interfaces/post.interface';

export type TPostsState = {
  posts: IPost[];
};

export const initialState: TPostsState = {
  posts: [],
};
