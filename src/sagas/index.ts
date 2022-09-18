import { all, fork } from 'redux-saga/effects';

import github from './github';
import product from './product';
import reservation from './reservation';
import room from './room';
import user from './user';

/**
 * rootSaga
 */
export default function* root() {
  yield all([fork(github), fork(user), fork(reservation), fork(room), fork(product)]);
}
