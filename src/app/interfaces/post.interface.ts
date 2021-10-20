export const POSTS_STATE_NAME = 'posts';

export const CREATE_POST = '[post] Create Post';
export const UPDATE_POST = '[post] Update Post';
export const DELETE_POST = '[post] Delete Post';

export interface IPost {
  id?: string;
  title: string;
  description: string;
}
