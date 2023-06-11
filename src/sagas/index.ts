import { all, fork } from 'redux-saga/effects';

import agentInfos from './agentInfos';
import branchHeader from './branchHeader';
import branchManager from './branchManager';
import branchs from './branchs';
import channel from './channel';
import checkin from './checkin';
import checkout from './checkout';
import customer from './customer';
import dashboard from './dashboard';
import file from './file';
import fuel from './fuel';
import github from './github';
import guest from './guest';
import houseKeeping from './houseKeeping';
import languageCode from './languageCode';
import nightAudit from './nightAudit';
import notifications from './notifications';
import payment from './payment';
import powerMonitor from './powerMonitor';
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
    fork(checkin),
    fork(checkout),
    fork(transaction),
    fork(payment),
    fork(guest),
    fork(houseKeeping),
    fork(file),
    fork(languageCode),
    fork(branchHeader),
    fork(branchs),
    fork(branchManager),
    fork(notifications),
    fork(fuel),
    fork(nightAudit),
    fork(dashboard),
    fork(powerMonitor),
    fork(customer),
  ]);
}
