import { all, fork } from 'redux-saga/effects';

import generalSaga from './general/sagas';
import collectionSaga from './collection/sagas';

export default function* rootSaga() {
  yield all([fork(collectionSaga)]);
  yield all([fork(generalSaga)]);
}
