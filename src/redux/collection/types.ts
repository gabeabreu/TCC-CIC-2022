export enum CollectionTypes {
  RESET_STATE = '@Collection/RESET_STATE',
  SET_CREATE_DATA = '@Collection/SET_CREATE_DATA',
  SET_COLLECTION_DATA = '@Collection/SET_COLLECTION_DATA',
}

export interface ResetState {
  type: CollectionTypes.RESET_STATE;
}

export interface SetCreateData {
  type: CollectionTypes.SET_CREATE_DATA;
  payload: { data: NFTCollection };
}

export interface SetCollectionData {
  type: CollectionTypes.SET_COLLECTION_DATA;
  payload: { data: any };
}

export type CollectionActionTypes = ResetState | SetCreateData | SetCollectionData;

export interface CollectionState {
  loading: boolean;
  createData: {
    data?: NFTCollection;
    loading: boolean;
  };
  collection: {
    data?: any;
    loading: boolean;
  };
}

export interface NFTCollection {
  name: string;
  image?: string | Blob;
  royaltyAmount?: string;
  externalLink?: string;
  royaltyAddressReceiver?: string;
  description?: string;
  item?: NFTItem;
}

export interface NFTItem {
  name?: string;
  supply?: number;
  externalLink?: string;
  description?: string;
  images?: Rarity[];
}

export interface Rarity {
  id?: number;
  src?: string;
  rarity?: string;
}
