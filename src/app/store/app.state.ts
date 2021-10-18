import { counterReducer } from '~/counter/state/counter.reducer';
import { ICounter } from '~/interfaces/counter.interface';
import { IPost } from '~/interfaces/post.interface';
import { postsReducer } from '~/post/state/posts.reducer';

export type TAppState = {
  counter: ICounter;
  posts: IPost;
};

export const appReducer = {
  counter: counterReducer,
  posts: postsReducer,
};
