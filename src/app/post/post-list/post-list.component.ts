import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IPost } from '../../interfaces/post.interface';
import { TAppState } from '../../store/app.state';
import { deletePost } from '../state/posts.actions';
import { selectPosts } from '../state/posts.selector';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  posts$!: Observable<IPost[]>;

  constructor(private store: Store<TAppState>) {}

  ngOnInit(): void {
    this.posts$ = this.store.select(selectPosts);
  }

  onDeletePost(post: IPost) {
    if (confirm(`Are you sure want to delete Post: ${post.title.toUpperCase()}?`)) {
      this.store.dispatch(deletePost({ post }));
    }
  }
}
