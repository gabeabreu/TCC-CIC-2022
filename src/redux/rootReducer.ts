import { combineReducers } from '@reduxjs/toolkit';
import general from './general';
import user from './user';

const rootReducer = combineReducers({
  general,
  user
});

export default rootReducer;
