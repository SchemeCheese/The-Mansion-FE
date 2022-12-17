import { all, fork } from 'redux-saga/effects';

import agentInfos from './agentInfos';
import branchHeader from './branchHeader';
import branchs from './branchs';
import channel from './channel';
import file from './file';
import github from './github';
import guest from './guest';
import languageCode from './languageCode';
import notifications from './notifications';
import payment from './payment';
import product from './product';
import productType from './productType';
import reservation from './reservation';
import room from './room';
import schedule from './schedule';
import transaction from './transaction';
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
    fork(transaction),
    fork(payment),
    fork(guest),
    fork(file),
    fork(languageCode),
    fork(branchHeader),
    fork(branchs),
    fork(notifications),
  ]);
}
