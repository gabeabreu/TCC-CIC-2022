export enum CollectionTypes {
  RESET_STATE = '@Collection/RESET_STATE',
  SET_CREATE_DATA = '@Collection/SET_CREATE_DATA',
}

export interface ResetState {
  type: CollectionTypes.RESET_STATE;
}

export interface SetCreateData {
  type: CollectionTypes.SET_CREATE_DATA;
  payload: { data: NFTCollection };
}

export type CollectionActionTypes = ResetState | SetCreateData;

export interface CollectionState {
  loading: boolean;
  createData: {
    data?: NFTCollection;
    loading: boolean;
  };
}

export interface NFTCollection {
  name: string;
  royaltyAmount?: string;
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
