import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { TPost } from '~/interfaces/post.interface';
import { selectPostByIdProps } from '~/post/state/posts.selector';
import { TAppState } from '~/store/app.state';
import { setLoadingSpinner } from '~/store/shared/shared.actions';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
})
export class SinglePostComponent implements OnInit {
  post$: Observable<TPost | undefined>;

  constructor(private store: Store<TAppState>) {
    this.post$ = this.store.select(selectPostByIdProps);
    this.store.dispatch(setLoadingSpinner({ status: true }));
  }

  ngOnInit(): void {}
}
