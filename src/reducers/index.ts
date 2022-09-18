import alerts, { alertsState } from './alerts';
import app, { appState } from './app';
import createReservation, { createReservationState } from './createReservation';
import getReservationDetail, { reservationDetailState } from './getReservationDetail';
import github, { githubState } from './github';
import reservation, { reservationSearchState } from './reservation';
import searchRoom, { roomSearchState } from './searchRoom';
import user, { userState } from './user';

export const initialState = {
  alerts: alertsState,
  app: appState,
  github: githubState,
  user: userState,
  reservation: reservationSearchState,
  createReservation: createReservationState,
  searchRoom: roomSearchState,
  getReservationDetail: reservationDetailState,
};

export default {
  ...alerts,
  ...app,
  ...github,
  ...user,
  ...reservation,
  ...createReservation,
  ...searchRoom,
  ...getReservationDetail,
};
