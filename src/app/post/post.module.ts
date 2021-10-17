import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AddPostComponent } from './add-post/add-post.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostRoutingModule } from './post-routing.module';

@NgModule({
  declarations: [PostListComponent, AddPostComponent],
  imports: [CommonModule, PostRoutingModule, ReactiveFormsModule],
})
export class PostModule {}
