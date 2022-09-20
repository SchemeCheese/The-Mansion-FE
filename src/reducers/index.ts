import alerts, { alertsState } from './alerts';
import app, { appState } from './app';
import createReservation, { createReservationState } from './createReservation';
import getReservationDetail, { reservationDetailState } from './getReservationDetail';
import getReservationNumber, { reservationNumberState } from './getReservationNumber';
import github, { githubState } from './github';
import product, { productSearchState } from './product';
import reservation, { reservationSearchState } from './reservation';
import searchRoom, { roomSearchState } from './searchRoom';
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
};
