import { combineReducers } from '@reduxjs/toolkit';
import general from './general';
import user from './user';
import collection from './collection';

const rootReducer = combineReducers({
  general,
  collection,
  user
});

export default rootReducer;
