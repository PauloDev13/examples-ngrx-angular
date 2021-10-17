import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddPostComponent } from './add-post/add-post.component';
import { PostListComponent } from './post-list/post-list.component';

const routes: Routes = [
  {
    path: 'posts',
    component: PostListComponent,
    children: [
      {
        path: 'add',
        component: AddPostComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
