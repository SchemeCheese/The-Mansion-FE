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
  GET_BY_FOLIO: 'api/v1/reservations/folio',
  GET_DETAIL: 'api/v1/reservations',
  GET_RESERVATION_NUMBER: 'api/v1/reservation-numbers/create',
  UPDATE_RATE: 'api/v1/reservations',
  BOOK_ROOM: 'api/v1/reservations',
  ADD_RESERVATION_DETAIL: 'api/v1/reservations',
  CANCEL_RESERVATION_DETAIL: 'api/v1/reservations',
  UPDATE_GENERAL_INFO: 'api/v1/reservations',
  SEARCH_SCHEDULE: 'api/v1/events',
  SEARCH_AVAILABLE_SCHEDULE: 'api/v1/get-available-events',
  RESEND_EMAIL: 'api/v1/reservations',
  DOWNLOAD_PDF: 'api/v1/reservations',
  DOWNLOAD_DOCX: 'api/v1/reservations',
  PRINT_REGISTRATION_CARD_PDF: 'api/v1/reservations',
  PRINT_DEPOSIT_PDF: 'api/v1/reservations',
  CHECKIN: 'api/v1/reservations',
  CHECKOUT: 'api/v1/reservations',
  CHECKOUT_ADD_LATE_FEE: 'api/v1/reservations',
};

export const RoomEndpoint = {
  SEARCH: 'api/v1/check-room-info',
  SEARCH_TYPE: 'api/v1/room-types',
  GET_ROOM: 'api/v1/rooms',
  GET_RESERVATION_ROOM: 'api/v1/get-reservation-rooms',
};

export const ProductEndpoint = {
  SEARCH: 'api/v1/products',
};

export const AgentInfoEndpoint = {
  GET_AGENT: 'api/v1/agent_infos',
};

export const NotificationEndpoint = {
  GET_NOTIFICATION: 'api/v1/notifications',
  READ_NOTIFICATION: 'api/v1/notifications/read',
};

export const ProductTypeEndpoint = {
  GET_LIST: 'api/v1/description-categories',
};

export const ChannelEndpoint = {
  GET_LIST: 'api/v1/channels',
  SET_ROOM_DATE: 'api/v1/update-available-room',
};

export const TransactionEndpoint = {
  ADD_ITEM: 'api/v1/sale-info/product/create',
  DELETE_ITEM: 'api/v1/sale-info/product/delete',
  CHANGE_DISK: 'api/v1/change-disk',
  CHANGE_ROOM: 'api/v1/change-room',
  DOWNLOAD_INVOICE_PDF: 'api/v1/reservations',
};

export const PaymentEndpoint = {
  CREATE_PAYMENT: 'api/v1/payments/create',
};

export const GuestEndpoint = {
  CREATE: 'api/v1/guests/create',
  UPDATE: 'api/v1/guests',
  REMOVE: 'api/v1/reservation-detail',
  SET_MAIN_GUEST: 'api/v1/reservation-detail',
};

export const FileEndpoint = {
  UPLOAD: 'api/v1/upload-images',
};

export const LanguageCodeEndpoint = {
  GET_ALL: 'api/v1/language-codes',
};

export const GetBranchOfEmployeeEndpoint = {
  GET: 'api/v1/employee-branch',
};

export const GetAllBranchsEndpoint = {
  GET: 'api/v1/branchs',
};

export const GetAllBranchManagerEndpoint = {
  GET: 'api/branch',
};

export const GetFacilitiesByBranch = {
  GET: 'api/v1/branch-facility',
};

export const NightAuditEndpoint = {
  HANDLE_NOSHOW: 'api/v1/no-show-reservation-detail',
  HANDLE_NIGHT_AUDIT: 'api/v1/night-audit/facility',
};

export const IOTEndpoint = {
  dashboard: {
    fuel: {
      water: 'api/water',
      electric: 'api/electric',
    },
  },
  powerMonitor: {
    device: 'api/device',
  },
};
