import { createEntityAdapter, EntityState } from '@ngrx/entity';

import { TPost } from '~/interfaces/post.interface';

export interface IPostsState extends EntityState<TPost> {
  counter: number;
  // post: TPost;
}

export const postsAdapter = createEntityAdapter<TPost>({
  sortComparer: sortByTitle,
});
export const initialState: IPostsState = postsAdapter.getInitialState({ counter: 0 });

function sortByTitle(a: TPost, b: TPost): number {
  const compare = a.title.localeCompare(b.title);
  if (compare > 0) {
    return -1;
  }

  if (compare < 0) {
    return 1;
  }
  return compare;
}

// export type TPostsState = {
//   posts: TPost[];
// };

// export const initialState: TPostsState = {
//   posts: [],
// };
