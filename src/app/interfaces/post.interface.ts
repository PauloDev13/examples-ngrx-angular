export const POSTS_STATE_NAME = 'posts';

export const LOAD_POSTS_ACTION = '[post page] Load Posts Action';
export const SUCCESS_POSTS_ACTION = '[post page] Success Posts Action';

export const ADD_POST_ACTION = '[post page] Add Post Action';
export const ADD_SUCCESS_POST = '[post page] Add Success Post Action';

export const UPDATE_POST_ACTION = '[post page] Update Post Action';
export const UPDATE_SUCCESS_POST = '[post page] Update Success Post Action';

export const DELETE_POST_ACTION = '[post page] Delete Post Action';
export const DELETE_SUCCESS_POST = '[post page] Delete Success Post Action';

interface IPost {
  id?: string;
  title: string;
  description: string;
}

export type TPost = IPost;
export type TPosts = IPost[];
