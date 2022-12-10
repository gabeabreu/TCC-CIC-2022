import { all, takeLatest } from 'redux-saga/effects';
import { CollectionTypes } from './types';

function* resetState() {
  console.log('resetState');
}

function* collectionSaga() {
  yield all([takeLatest(CollectionTypes.RESET_STATE, resetState)]);
}

export default collectionSaga;
