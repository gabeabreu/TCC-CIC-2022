/* eslint-disable default-param-last */
import { Reducer } from '@reduxjs/toolkit';
import { UserState, UserTypes } from './types';

import * as Actions from './actions';

const INITIAL_STATE: UserState = {
  loading: false,
  data: {
    address: "",
    name: "",
    bio: "",
    discord: "",
    website: "",
    twitter: "",
    instagram: "",
    isVerified: false,
    profilePictureUrl: "",
    bannerPictureUrl: "",
  }
};

const reducer: Reducer<UserState> = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case UserTypes.RESET_STATE:
      return INITIAL_STATE;

    case UserTypes.SET_USER_DATA:
      return {...state, data: payload.data};
      
    default:
      return state;
  }
};

export const UserActions = Actions;
export default reducer;
