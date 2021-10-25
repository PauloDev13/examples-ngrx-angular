import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { HomeComponent } from './home/home.component';
import { ListPostsComponent } from './list-posts/list-posts.component';
import { PostsRoutingModule } from './posts-routing.module';
import { SinglePostComponent } from './single-post/single-post.component';

@NgModule({
  declarations: [
    AddPostComponent,
    HomeComponent,
    EditPostComponent,
    ListPostsComponent,
    SinglePostComponent,
  ],
  imports: [CommonModule, PostsRoutingModule],
})
export class PostsModule {}
