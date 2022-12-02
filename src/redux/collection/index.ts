/* eslint-disable default-param-last */
import { Reducer } from '@reduxjs/toolkit';
import { GeneralState, GeneralTypes } from './types';

import * as Actions from './actions';

const INITIAL_STATE: GeneralState = {
  loading: false,
};

const reducer: Reducer<GeneralState> = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GeneralTypes.RESET_STATE:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export const GeneralActions = Actions;
export default reducer;
