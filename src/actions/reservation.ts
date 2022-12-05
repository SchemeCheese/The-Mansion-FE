import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import {
  AddReservationDetail,
  BookRoom,
  CancelReservationDetail,
  CopyReservationFinishPayload,
  CopyReservationPayload,
  CreateReservationResult,
  DownloadDocxReservationDetail,
  DownloadPDFReservationDetail,
  GetReservationByFolioFinishPayload,
  GetReservationByFolioPayload,
  GetReservationFinishPayload,
  GetReservationPayload,
  ResendEmailReservation,
  ReservationCreate,
  ReservationDetail,
  ReservationDetailFinish,
  ReservationNumberGetPayload,
  ReservationNumberResult,
  ReservationSearch,
  ReservationSearchResult,
  UpdateGeneralInfo,
  UpdateNoteReservationDetail,
  UpdateRate,
} from 'types';

export const searchReservation = createAction(
  ActionTypes.RESERVATION_SEARCH,
  (payload: ReservationSearch) => actionPayload(payload),
);

export const searchReservationFinish = createAction(
  ActionTypes.RESERVATION_SEARCH_FINISH,
  (payload: ReservationSearchResult) => actionPayload(payload),
);

export const createReservation = createAction(
  ActionTypes.RESERVATION_CREATE,
  (payload: ReservationCreate) => actionPayload(payload),
);

export const createReservationSuccess = createAction(
  ActionTypes.RESERVATION_CREATE_SUCCESS,
  (payload: CreateReservationResult) => actionPayload(payload),
);

export const updateReservation = createAction(
  ActionTypes.RESERVATION_UPDATE,
  (payload: ReservationCreate) => actionPayload(payload),
);

export const updateReservationSuccess = createAction(ActionTypes.RESERVATION_UPDATE_SUCCESS);

export const getReservationNumber = createAction(
  ActionTypes.RESERVATION_NUMBER_GET,
  (payload: ReservationNumberGetPayload) => actionPayload(payload),
);

export const getReservationNumberFinish = createAction(
  ActionTypes.RESERVATION_NUMBER_GET_FINISH,
  (payload: ReservationNumberResult) => actionPayload(payload),
);

export const getReservationDetail = createAction(
  ActionTypes.RESERVATION_GET_DETAIL,
  (payload: ReservationDetail) => actionPayload(payload),
);

export const getReservationDetailFinish = createAction(
  ActionTypes.RESERVATION_GET_DETAIL_FINISH,
  (payload: ReservationDetailFinish) => actionPayload(payload),
);

export const getReservation = createAction(
  ActionTypes.RESERVATION_GET,
  (payload: GetReservationPayload) => actionPayload(payload),
);

export const getReservationFinish = createAction(
  ActionTypes.RESERVATION_GET_FINISH,
  (payload: GetReservationFinishPayload) => actionPayload(payload),
);

export const updateRate = createAction(ActionTypes.RESERVATION_RATE_UPDATE, (payload: UpdateRate) =>
  actionPayload(payload),
);

export const updateRateSuccess = createAction(ActionTypes.RESERVATION_RATE_UPDATE_SUCCESS);

export const bookRoom = createAction(ActionTypes.RESERVATION_BOOK_ROOM, (payload: BookRoom) =>
  actionPayload(payload),
);

export const bookRoomSuccess = createAction(ActionTypes.RESERVATION_BOOK_ROOM_SUCCESS);

export const resetReservation = createAction(ActionTypes.RESERVATION_RESET);

export const resetReservationDetail = createAction(ActionTypes.RESERVATION_GET_DETAIL_RESET);

export const addReservationDetail = createAction(
  ActionTypes.RESERVATION_ADD_RESERVATION_DETAIL,
  (payload: AddReservationDetail) => actionPayload(payload),
);

export const addReservationDetailSuccess = createAction(
  ActionTypes.RESERVATION_ADD_RESERVATION_DETAIL_SUCCESS,
);

export const cancelReservationDetail = createAction(
  ActionTypes.RESERVATION_CANCEL_RESERVATION_DETAIL,
  (payload: CancelReservationDetail) => actionPayload(payload),
);

export const cancelReservationDetailSuccess = createAction(
  ActionTypes.RESERVATION_CANCEL_RESERVATION_DETAIL_SUCCESS,
);

export const updateGeneralInfo = createAction(
  ActionTypes.RESERVATION_GENERAL_INFO_UPDATE,
  (payload: UpdateGeneralInfo) => actionPayload(payload),
);

export const updateGeneralInfoSuccess = createAction(ActionTypes.RESERVATION_GENERAL_INFO_SUCCESS);

export const updateNoteReservationDetail = createAction(
  ActionTypes.RESERVATION_DETAIL_UPDATE_NOTE,
  (payload: UpdateNoteReservationDetail) => actionPayload(payload),
);

export const updateNoteReservationDetailSuccess = createAction(
  ActionTypes.RESERVATION_DETAIL_UPDATE_NOTE_SUCCESS,
);

export const resendEmailReservationAction = createAction(
  ActionTypes.RESERVATION_RESEND_EMAIL,
  (payload: ResendEmailReservation) => actionPayload(payload),
);

export const resendEmailReservationSuccessAction = createAction(
  ActionTypes.RESERVATION_RESEND_EMAIL_SUCCESS,
);

export const downloadPDFReservationDetail = createAction(
  ActionTypes.RESERVATION_DETAIL_DOWNLOAD_PDF,
  (payload: DownloadPDFReservationDetail) => actionPayload(payload),
);

export const downloadPDFReservationDetailSuccess = createAction(
  ActionTypes.RESERVATION_DETAIL_DOWNLOAD_PDF_SUCCESS,
);

export const downloadDocxReservationDetail = createAction(
  ActionTypes.RESERVATION_DETAIL_DOWNLOAD_DOCX,
  (payload: DownloadDocxReservationDetail) => actionPayload(payload),
);

export const downloadDocxReservationDetailSuccess = createAction(
  ActionTypes.RESERVATION_DETAIL_DOWNLOAD_DOCX_SUCCESS,
);

export const getReservationByFolio = createAction(
  ActionTypes.RESERVATION_GET_BY_FOLIO,
  (payload: GetReservationByFolioPayload) => actionPayload(payload),
);

export const getReservationByFolioFinish = createAction(
  ActionTypes.RESERVATION_GET_BY_FOLIO_FINISH,
  (payload: GetReservationByFolioFinishPayload) => actionPayload(payload),
);

export const resetReservationByFolio = createAction(ActionTypes.RESERVATION_GET_BY_FOLIO_RESET);

export const copyReservationAction = createAction(
  ActionTypes.COPY_RESERVATION,
  (payload: CopyReservationPayload) => actionPayload(payload),
);

export const copyReservationActionSuccess = createAction(
  ActionTypes.COPY_RESERVATION_SUCCESS,
  (payload: CopyReservationFinishPayload) => actionPayload(payload),
);
