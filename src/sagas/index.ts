import { all, fork } from 'redux-saga/effects';

import github from './github';
import reservation from './reservation';
import user from './user';

/**
 * rootSaga
 */
export default function* root() {
  yield all([fork(github), fork(user), fork(reservation)]);
}
