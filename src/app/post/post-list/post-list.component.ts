import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IPost } from '~/interfaces/post.interface';
import { deletePost, loadPosts } from '~/post/state/posts.actions';
import { selectPosts } from '~/post/state/posts.selector';
import { TAppState } from '~/store/app.state';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  posts$: Observable<IPost[]>;

  constructor(private store: Store<TAppState>) {
    this.posts$ = store.select(selectPosts);
  }

  ngOnInit(): void {
    this.store.dispatch(loadPosts());
  }

  onDeletePost(post: IPost) {
    if (confirm(`Are you sure want to delete Post: ${post.title.toUpperCase()}?`)) {
      this.store.dispatch(deletePost({ post }));
    }
  }
}
