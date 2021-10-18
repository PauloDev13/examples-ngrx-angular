import { IPost } from '~/interfaces/post.interface';

export type TPostsState = {
  posts: IPost[];
};

export const initialState: TPostsState = {
  posts: [
    { id: '1', title: 'Sample titile 1', description: 'Sample Description 1' },
    { id: '2', title: 'Sample titile 2', description: 'Sample Description 2' },
  ],
};
