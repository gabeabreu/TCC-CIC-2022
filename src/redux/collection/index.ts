/* eslint-disable default-param-last */
import { Reducer } from '@reduxjs/toolkit';
import { CollectionState, CollectionTypes } from './types';

import * as Actions from './actions';

const INITIAL_STATE: CollectionState = {
  loading: false,
  createData: {
    data: undefined,
    loading: false,
  },
  collection: {
    data: undefined,
    loading: false,
  },
};

const reducer: Reducer<CollectionState> = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case CollectionTypes.RESET_STATE:
      return INITIAL_STATE;

    case CollectionTypes.SET_CREATE_DATA:
      return {
        ...state,
        createData: {
          ...state.createData,
          data: payload.data,
        },
      };

    case CollectionTypes.SET_COLLECTION_DATA:
      return {
        ...state,
        collection: {
          ...state.collection,
          data: payload.data,
        },
      };

    default:
      return state;
  }
};

export const CollectionActions = Actions;
export default reducer;
