import agentInfos, { agentInfosState } from './agentInfos';
import alerts, { alertsState } from './alerts';
import app, { appState } from './app';
import bookRoom, { bookRoomState } from './bookRoom';
import createReservation, { createReservationState } from './createReservation';
import getReservation, { getReservationState } from './getReservation';
import getReservationDetail, { reservationDetailState } from './getReservationDetail';
import getReservationNumber, { reservationNumberState } from './getReservationNumber';
import getRoomType, { roomTypeState } from './getRoomType';
import github, { githubState } from './github';
import product, { productSearchState } from './product';
import reservation, { reservationSearchState } from './reservation';
import searchRoom, { roomSearchState } from './searchRoom';
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
};
