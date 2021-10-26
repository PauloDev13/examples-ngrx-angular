import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { IPostModel } from '~/posts/models/post-model';
import { PostsEntityService } from '~/posts/services/posts-entity.service';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss'],
})
export class ListPostsComponent implements OnInit {
  posts$: Observable<IPostModel[]>;

  constructor(private postsEntityService: PostsEntityService) {
    this.posts$ = this.postsEntityService.getAll();
  }

  ngOnInit(): void {}
}
