import { EntityDataModuleConfig, EntityMetadataMap } from '@ngrx/data';

import { IPostModel } from '~/posts/models/post-model';

export const entityMetadata: EntityMetadataMap = {
  Post: {
    sortComparer: sortByName,
    entityDispatcherOptions: {
      optimisticUpdate: true,
      optimisticDelete: false,
    },
  },
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
};

function sortByName(a: IPostModel, b: IPostModel): number {
  let comp = a.title.localeCompare(b.title);
  if (comp > 0) return -1;
  if (comp < 0) return 1;
  return comp;
}
