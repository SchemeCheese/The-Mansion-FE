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
  UPDATE: 'api/v1/reservations',
  DETAIL: 'api/v1/reservations',
  GET_DETAIL: 'api/v1/reservations',
  GET_RESERVATION_NUMBER: 'api/v1/reservation-numbers/create',
  UPDATE_RATE: 'api/v1/reservations',
  BOOK_ROOM: 'api/v1/reservations',
  ADD_RESERVATION_DETAIL: 'api/v1/reservations',
  CANCEL_RESERVATION_DETAIL: 'api/v1/reservations',
  UPDATE_GENERAL_INFO: 'api/v1/reservations',
  SEARCH_SCHEDULE: 'api/v1/events',
  SEARCH_AVAILABLE_SCHEDULE: 'api/v1/get-available-events',
};

export const RoomEndpoint = {
  SEARCH: 'api/v1/check-room-info',
  SEARCH_TYPE: 'api/v1/room-types',
};

export const ProductEndpoint = {
  SEARCH: 'api/v1/products',
};

export const AgentInfoEndpoint = {
  GET_AGENT: 'api/v1/agent_infos',
};

export const ProductTypeEndpoint = {
  GET_LIST: 'api/v1/description-categories',
};

export const ChannelEndpoint = {
  GET_LIST: 'api/v1/channels',
};

export const TransactionEndpoint = {
  ADD_ITEM: 'api/v1/sale-info/product/create',
  DELETE_ITEM: 'api/v1/sale-info/product/delete',
  CHANGE_DISK: 'api/v1/change-disk',
};

export const PaymentEndpoint = {
  CREATE_PAYMENT: 'api/v1/payments/create',
};

export const GuestEndpoint = {
  CREATE: 'api/v1/guests/create',
};
