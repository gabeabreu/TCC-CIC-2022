import { all, fork } from 'redux-saga/effects';

import generalSaga from './general/sagas';

export default function* rootSaga() {
  yield all([fork(generalSaga)]);
}
