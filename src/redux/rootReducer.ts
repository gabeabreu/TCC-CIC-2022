import { combineReducers } from '@reduxjs/toolkit';
import general from './general';
import collection from './collection';

const rootReducer = combineReducers({
  general,
  collection,
});

export default rootReducer;
