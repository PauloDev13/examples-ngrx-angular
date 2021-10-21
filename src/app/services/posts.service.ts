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
}
