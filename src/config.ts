import { STATUS } from 'literals';

import { Topic } from 'types';

export const description = 'Boilerplate with React and Redux with Redux Saga';
export const name = 'React Redux Saga Boilerplate';
export const topic: Topic = {
  cached: false,
  data: [],
  message: '',
  status: STATUS.IDLE,
  updatedAt: 0,
};

/* API Path */
export const AuthPath = {
  LOGIN_PATH: 'auth/login',
  PROFILE_PATH: 'auth/me',
};

export const ReservationEndpoint = {
  SEARCH: 'api/v1/reservations',
  CREATE: 'api/v1/reservations/create',
  UPDATE: 'api/v1/reservations/update',
  GET_DETAIL: 'api/v1/reservations',
  GET_RESERVATION_NUMBER: 'api/v1/reservation-numbers/create',
};

export const RoomEndpoint = {
  SEARCH: 'api/v1/check-room-info',
};

export const ProductEndpoint = {
  SEARCH: 'api/v1/products',
};
