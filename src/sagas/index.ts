import { all, fork } from 'redux-saga/effects';

import agentInfos from './agentInfos';
import channel from './channel';
import github from './github';
import product from './product';
import productType from './productType';
import reservation from './reservation';
import room from './room';
import schedule from './schedule';
import user from './user';

/**
 * rootSaga
 */
export default function* root() {
  yield all([
    fork(github),
    fork(user),
    fork(reservation),
    fork(room),
    fork(product),
    fork(agentInfos),
    fork(schedule),
    fork(productType),
    fork(channel),
  ]);
}
