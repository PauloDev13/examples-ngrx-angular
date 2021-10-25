import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TPost } from '~/interfaces/post.interface';
import { TAppState } from '~/store/app.state';
import { setEmptyTable } from '~/store/shared/shared.actions';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient, private store: Store<TAppState>) {}

  getPosts(): Observable<TPost[]> {
    return this.http
      .get<TPost[]>(
        `https://ng-fitness-tracker-b6920-default-rtdb.firebaseio.com/posts.json`,
      )
      .pipe(
        map((data) => {
          const posts: TPost[] = [];
          for (let key in data) {
            posts.push({ ...data[key], id: key });
          }

          if (posts.length === 0) {
            this.store.dispatch(setEmptyTable({ status: false }));
          } else {
            this.store.dispatch(setEmptyTable({ status: true }));
          }
          // this.store.dispatch(setLoadingSpinner({ status: false }));

          return posts;
        }),
      );
  }

  addPost(post: TPost): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      `https://ng-fitness-tracker-b6920-default-rtdb.firebaseio.com/posts.json`,
      post,
    );
  }

  updatePost(post: TPost): Observable<TPost> {
    const { id, title, description } = post;
    const postData = { [id as string]: { title, description } };
    return this.http.patch<TPost>(
      `https://ng-fitness-tracker-b6920-default-rtdb.firebaseio.com/posts.json`,
      postData,
    );
  }

  deletePost(id: string | undefined): Observable<void> {
    return this.http.delete<void>(
      `https://ng-fitness-tracker-b6920-default-rtdb.firebaseio.com/posts/${id}.json`,
    );
  }

  getPostById(id: string | undefined): Observable<TPost> {
    return this.http.get<TPost>(
      `https://ng-fitness-tracker-b6920-default-rtdb.firebaseio.com/posts/${id}.json`,
    );
  }
}
