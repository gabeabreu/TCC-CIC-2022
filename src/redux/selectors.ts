import { select } from 'redux-saga/effects';

import ApplicationState from './types';

export function* getGeneral() {
  const generalState: ApplicationState = yield select((state: ApplicationState) => state.general);
  return generalState;
}
