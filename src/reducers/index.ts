import alerts, { alertsState } from './alerts';
import app, { appState } from './app';
import createReservation, { createReservationState } from './createReservation';
import github, { githubState } from './github';
import reservation, { reservationSearchState } from './reservation';
import user, { userState } from './user';

export const initialState = {
  alerts: alertsState,
  app: appState,
  github: githubState,
  user: userState,
  reservation: reservationSearchState,
  createReservation: createReservationState,
};

export default {
  ...alerts,
  ...app,
  ...github,
  ...user,
  ...reservation,
  ...createReservation,
};
