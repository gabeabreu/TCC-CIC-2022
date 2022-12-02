import { all, takeLatest } from 'redux-saga/effects';
import { GeneralTypes } from './types';

function* resetState() {
  console.log('resetState');
}

function* generalSaga() {
  yield all([takeLatest(GeneralTypes.RESET_STATE, resetState)]);
}

export default generalSaga;
