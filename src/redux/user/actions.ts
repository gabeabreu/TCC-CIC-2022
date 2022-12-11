import { nanoid } from '@reduxjs/toolkit';
import FormControl from 'rsuite/esm/FormControl';
import { action } from 'typesafe-actions';
import { User, UserActionTypes, UserTypes } from './types';

export function resetStateUser(): UserActionTypes {
  return action(UserTypes.RESET_STATE);
}
export function setUserData(data: User): UserActionTypes {
  return action(UserTypes.SET_USER_DATA, {
    data
  });
}
