import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { POSTS_STATE_NAME, TPost } from '~/interfaces/post.interface';
import { RouterStateUrl } from '~/store/router/custom-serializer';
import { selectCurrentRoute } from '~/store/router/router.selector';

import { IPostsState, postsAdapter } from './posts.state';

const selectPostsState = createFeatureSelector<IPostsState>(POSTS_STATE_NAME);
export const postsSelectors = postsAdapter.getSelectors();

export const selectPosts = createSelector(selectPostsState, postsSelectors.selectAll);

export const selectPostEntities = createSelector(
  selectPostsState,
  postsSelectors.selectEntities,
);

export const selectPostByIdProps = createSelector(
  selectPostEntities,
  selectCurrentRoute,
  (posts: Dictionary<TPost>, route: RouterStateUrl) => {
    return posts ? posts[route.params['id']] : null;
  },
);

// export const selectPosts = createSelector(selectPostsState, (state: IPostsState) => {
//   return state.posts;
// });

// export const selectPostByIdProps = createSelector(
//   selectPosts,
//   selectCurrentRoute,
//   (posts: TPosts, route: RouterStateUrl) =>
//     posts.find((post) => post.id === route.params['id'] ?? null),
// );

// export const selectPostByIdProps = (props: { id: string }) =>
//   createSelector(selectPostsState, (state: TPostsState) =>
//     state.posts.find((post) => post.id === props.id),
//   );
