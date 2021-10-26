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
}
