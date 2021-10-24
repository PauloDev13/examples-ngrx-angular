import { createFeatureSelector, createSelector } from '@ngrx/store';

import { POSTS_STATE_NAME, TPosts } from '~/interfaces/post.interface';
import { RouterStateUrl } from '~/store/router/custom-serializer';
import { selectCurrentRoute } from '~/store/router/router.selector';

import { TPostsState } from './posts.state';

const selectPostsState = createFeatureSelector<TPostsState>(POSTS_STATE_NAME);

export const selectPosts = createSelector(selectPostsState, (state: TPostsState) => {
  return state.posts;
});

export const selectPostByIdProps = createSelector(
  selectPosts,
  selectCurrentRoute,
  (posts: TPosts, route: RouterStateUrl) =>
    posts.find((post) => post.id === route.params['id'] ?? null),
);

// export const selectPostByIdProps = (props: { id: string }) =>
//   createSelector(selectPostsState, (state: TPostsState) =>
//     state.posts.find((post) => post.id === props.id),
//   );
