import { Component, OnInit } from '@angular/core';

import { PostsEntityService } from '~/posts/services/posts-entity.service';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss'],
})
export class ListPostsComponent implements OnInit {
  constructor(private postsEntityService: PostsEntityService) {}

  ngOnInit(): void {
    this.postsEntityService.getAll();
  }
}
