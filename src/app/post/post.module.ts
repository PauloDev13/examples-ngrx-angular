import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { POSTS_STATE_NAME } from '~/interfaces/post.interface';
import { PostsEffects } from '~/post/state/posts.effects';

import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostRoutingModule } from './post-routing.module';
import { postsReducer } from './state/posts.reducer';

@NgModule({
  declarations: [PostListComponent, AddPostComponent, EditPostComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(POSTS_STATE_NAME, postsReducer),
    EffectsModule.forFeature([PostsEffects]),
  ],
})
export class PostModule {}
