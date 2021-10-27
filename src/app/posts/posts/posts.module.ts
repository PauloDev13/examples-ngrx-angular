import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EntityDataService, EntityDefinitionService } from '@ngrx/data';

import { entityMetadata } from '~/posts/entity-metadata';
import { PostsDataService } from '~/posts/services/posts-data.service';

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
  imports: [
    CommonModule,
    PostsRoutingModule,
    ReactiveFormsModule,
    // EntityDataModule.forRoot(entityConfig),
  ],
})
export class PostsModule {
  constructor(
    entityDefinitionService: EntityDefinitionService,
    postsDataService: PostsDataService,
    entityDataService: EntityDataService,
  ) {
    entityDefinitionService.registerMetadataMap(entityMetadata);
    entityDataService.registerService('Post', postsDataService);
  }

  // constructor(entityDataService: EntityDataService, postsDataService: PostsDataService) {
  //   entityDataService.registerService('Post', postsDataService);
  // }
}
