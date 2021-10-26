import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPostModel } from '~/posts/models/post-model';

import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class PostsDataService extends DefaultDataService<IPostModel> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Post', http, httpUrlGenerator);
  }

  getAll(): Observable<IPostModel[]> {
    return this.http.get<IPostModel[]>(`${environment.FIREBASE_API_URL}/posts.json`).pipe(
      map((data) => {
        const posts: IPostModel[] = [];
        for (let key in data) {
          posts.push({ ...data[key], id: key });
        }
        return posts;
      }),
    );
  }

  add(post: IPostModel): Observable<IPostModel> {
    return this.http
      .post<{ name: string }>(`${environment.FIREBASE_API_URL}/posts.json`, post)
      .pipe(
        map((data) => {
          return { ...post, id: data.name };
        }),
      );
  }

  // update(post: Update<IPostModel>): Observable<IPostModel> {
  //   /const { id, title, description } = post;
  //   const postData = { [id as string]: { post } };
  //   return this.http.patch<TPost>(
  //     `https://ng-fitness-tracker-b6920-default-rtdb.firebaseio.com/posts.json`,
  //     postData,
  //   );
  // }

  // delete(id: string | undefined): Observable<string | undefined> {
  //   return this.http.delete<string>(
  //     `https://ng-fitness-tracker-b6920-default-rtdb.firebaseio.com/posts/${id}.json`,
  //   );
  // }
}
