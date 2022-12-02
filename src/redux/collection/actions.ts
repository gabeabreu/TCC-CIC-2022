import { action } from 'typesafe-actions';
import { GeneralActionTypes, GeneralTypes } from './types';

export function resetStateGeneral(): GeneralActionTypes {
  return action(GeneralTypes.RESET_STATE);
}
