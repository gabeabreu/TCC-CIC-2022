export enum GeneralTypes {
  RESET_STATE = '@General/RESET_STATE',
}

export interface ResetState {
  type: GeneralTypes.RESET_STATE;
}

export type GeneralActionTypes = ResetState;

export interface GeneralState {
  loading: boolean;
}
