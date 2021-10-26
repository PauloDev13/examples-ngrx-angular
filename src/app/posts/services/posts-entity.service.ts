import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';

import { IPostModel } from '~/posts/models/post-model';

@Injectable({
  providedIn: 'root',
})
export class PostsEntityService extends EntityCollectionServiceBase<IPostModel> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Post', serviceElementsFactory);
  }
}
