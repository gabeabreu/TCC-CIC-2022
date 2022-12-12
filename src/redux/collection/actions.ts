import { action } from 'typesafe-actions';
import { CollectionActionTypes, CollectionTypes, NFTCollection } from './types';

export function resetStateCollection(): CollectionActionTypes {
  return action(CollectionTypes.RESET_STATE);
}

export function setCreateData(data: NFTCollection): CollectionActionTypes {
  return action(CollectionTypes.SET_CREATE_DATA, { data });
}

export function setCollectionData(data: any): CollectionActionTypes {
  return action(CollectionTypes.SET_COLLECTION_DATA, { data });
}
