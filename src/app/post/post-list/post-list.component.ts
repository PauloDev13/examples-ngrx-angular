import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { TPost } from '~/interfaces/post.interface';
import { deletePost, loadPosts } from '~/post/state/posts.actions';
import { selectGetCounter, selectPosts } from '~/post/state/posts.selector';
import { TAppState } from '~/store/app.state';
import { setLoadingSpinner } from '~/store/shared/shared.actions';
import { selectEmptyTable } from '~/store/shared/shared.selectors';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  posts$: Observable<TPost[]>;
  isEmptyTable$: Observable<boolean>;
  counter$: Observable<number>;

  constructor(private store: Store<TAppState>) {
    this.posts$ = this.store.select(selectPosts);
    this.isEmptyTable$ = this.store.select(selectEmptyTable);
    this.counter$ = store.select(selectGetCounter);
  }

  ngOnInit(): void {
    this.store.dispatch(loadPosts());
    // this.store.dispatch(setLoadingSpinner({ status: true }));
  }

  onDeletePost(post: TPost) {
    if (confirm(`Are you sure want to delete Post: ${post.title.toUpperCase()}?`)) {
      this.store.dispatch(setLoadingSpinner({ status: true }));
      this.store.dispatch(deletePost({ id: post.id }));
    }
  }
}
