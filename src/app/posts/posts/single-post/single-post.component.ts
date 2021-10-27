import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPostModel } from '~/posts/models/post-model';
import { PostsEntityService } from '~/posts/services/posts-entity.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
})
export class SinglePostComponent implements OnInit {
  post!: IPostModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postsEntityService: PostsEntityService,
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.postsEntityService.entities$.subscribe((posts) => {
      this.post = posts.find((post) => post.id === id) as IPostModel;
    });
  }
}
