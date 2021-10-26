import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddPostComponent } from '~/posts/posts/add-post/add-post.component';
import { EditPostComponent } from '~/posts/posts/edit-post/edit-post.component';
import { HomeComponent } from '~/posts/posts/home/home.component';
import { ListPostsComponent } from '~/posts/posts/list-posts/list-posts.component';
import { SinglePostComponent } from '~/posts/posts/single-post/single-post.component';
import { PostsResolver } from '~/posts/resolvers/posts.resolver';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'posts-new',
    component: ListPostsComponent,
    resolve: { posts: PostsResolver },
  },
  {
    path: 'posts-new/add',
    component: AddPostComponent,
  },
  {
    path: 'posts-new/edit/:id',
    component: EditPostComponent,
  },
  {
    path: 'posts-new/single/:id',
    component: SinglePostComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
