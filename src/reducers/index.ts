import changeDisk, { changeDiskState } from 'reducers/changeDisk';

import addItem, { addItemState } from './addItem';
import addReservationDetail, { addReservationDetailState } from './addReservationDetail';
import agentInfos, { agentInfosState } from './agentInfos';
import alerts, { alertsState } from './alerts';
import app, { appState } from './app';
import bookRoom, { bookRoomState } from './bookRoom';
import cancelReservationDetail, { cancelReservationDetailState } from './cancelReservationDetail';
import channel, { channelState } from './channel';
import createGuest, { createGuestState } from './createGuest';
import createPayment, { createPaymentState } from './createPayment';
import createReservation, { createReservationState } from './createReservation';
import deleteItem, { deleteItemState } from './deleteItem';
import getProductType, { getProductTypeState } from './getProductType';
import getReservation, { getReservationState } from './getReservation';
import getReservationDetail, { reservationDetailState } from './getReservationDetail';
import getReservationNumber, { reservationNumberState } from './getReservationNumber';
import getRoomType, { roomTypeState } from './getRoomType';
import github, { githubState } from './github';
import product, { productSearchState } from './product';
import removeGuest, { removeGuestState } from './removeGuest';
import resendEmailReservation, { resendEmailReservationState } from './resendEmailReservation';
import reservation, { reservationSearchState } from './reservation';
import searchAvailableSchedule, { searchAvailableScheduleState } from './searchAvailableSchedule';
import searchRoom, { roomSearchState } from './searchRoom';
import searchSchedule, { searchScheduleState } from './searchSchedule';
import updateGeneralInfo, { updateGeneralInfoState } from './updateGeneralInfo';
import updateGuest, { updateGuestState } from './updateGuest';
import updateNoteReservationDetail, {
  updateNoteReservationDetailState,
} from './updateNoteReservationDetail';
import updateRate, { updateRateState } from './updateRate';
import updateReservation, { updateReservationState } from './updateReservation';
import user, { userState } from './user';

export const initialState = {
  alerts: alertsState,
  app: appState,
  github: githubState,
  user: userState,
  reservation: reservationSearchState,
  createReservation: createReservationState,
  updateReservation: updateReservationState,
  searchRoom: roomSearchState,
  getReservationDetail: reservationDetailState,
  product: productSearchState,
  getReservationNumber: reservationNumberState,
  getRoomType: roomTypeState,
  getReservation: getReservationState,
  agentInfos: agentInfosState,
  bookRoom: bookRoomState,
  updateRate: updateRateState,
  addReservationDetail: addReservationDetailState,
  cancelReservationDetail: cancelReservationDetailState,
  updateGeneralInfo: updateGeneralInfoState,
  searchSchedule: searchScheduleState,
  searchAvailableSchedule: searchAvailableScheduleState,
  getProductType: getProductTypeState,
  channel: channelState,
  addItem: addItemState,
  deleteItem: deleteItemState,
  createPayment: createPaymentState,
  changeDisk: changeDiskState,
  createGuest: createGuestState,
  updateNoteReservationDetail: updateNoteReservationDetailState,
  resendEmailReservation: resendEmailReservationState,
  updateGuest: updateGuestState,
  removeGuest: removeGuestState,
};

export default {
  ...alerts,
  ...app,
  ...github,
  ...user,
  ...reservation,
  ...createReservation,
  ...updateReservation,
  ...searchRoom,
  ...getReservationDetail,
  ...product,
  ...getReservationNumber,
  ...getRoomType,
  ...getReservation,
  ...agentInfos,
  ...bookRoom,
  ...updateRate,
  ...addReservationDetail,
  ...cancelReservationDetail,
  ...updateGeneralInfo,
  ...searchSchedule,
  ...searchAvailableSchedule,
  ...getProductType,
  ...channel,
  ...addItem,
  ...deleteItem,
  ...createPayment,
  ...changeDisk,
  ...createGuest,
  ...updateNoteReservationDetail,
  ...resendEmailReservation,
  ...updateGuest,
  ...removeGuest,
};
