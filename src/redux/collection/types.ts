export enum CollectionTypes {
  RESET_STATE = '@Collection/RESET_STATE',
}

export interface ResetState {
  type: CollectionTypes.RESET_STATE;
}

export type CollectionActionTypes = ResetState;

export interface CollectionState {
  loading: boolean;
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
