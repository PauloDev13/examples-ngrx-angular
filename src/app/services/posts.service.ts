import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPost } from '~/interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<IPost[]> {
    return this.http
      .get<IPost[]>(
        `https://ng-fitness-tracker-b6920-default-rtdb.firebaseio.com/posts.json`,
      )
      .pipe(
        map((data) => {
          const posts: IPost[] = [];
          for (let key in data) {
            posts.push({ ...data[key], id: key });
          }
          return posts;
        }),
      );
  }

  addPost(post: IPost): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      `https://ng-fitness-tracker-b6920-default-rtdb.firebaseio.com/posts.json`,
      post,
    );
  }

  updatePost(post: IPost): Observable<IPost> {
    const { id, title, description } = post;
    const postData = { [id as string]: { title, description } };
    return this.http.patch<IPost>(
      `https://ng-fitness-tracker-b6920-default-rtdb.firebaseio.com/posts.json`,
      postData,
    );
  }

  deletePost(id: string | undefined): Observable<void> {
    return this.http.delete<void>(
      `https://ng-fitness-tracker-b6920-default-rtdb.firebaseio.com/posts/${id}.json`,
    );
  }
}
