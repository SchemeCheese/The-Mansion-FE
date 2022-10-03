import React from 'react';
import { Dispatch } from 'redux';
import { Variants } from 'styled-minimal/lib/types';
import { ValueOf } from 'type-fest';

import { AlertPosition, Icons, Status } from './common';

export interface AlertData {
  icon: Icons;
  id: string;
  message: React.ReactNode;
  position: AlertPosition;
  timeout: number;
  variant: Variants;
}

export interface Topic {
  cached: boolean;
  data: Array<Record<string, any>>;
  message: string;
  status: ValueOf<Status>;
  updatedAt: number;
}

export interface AlertsState {
  data: AlertData[];
}

export interface AppState {
  query: string;
}

export interface GitHubState {
  topics: Record<string, Topic>;
}

export interface UserState {
  email: string;
  isAuthenticated: boolean;
  name: string;
  status: ValueOf<Status>;
}

export interface ReservationSearchState {
  booker_info: string;
  current_page: number;
  data: Array<Record<string, any>>;
  is_searching: boolean;
  total: number;
}

export interface ReservationNumberState {
  operator_code: string;
  reservation_number: string;
}

export interface RoomSearchState {
  charges: Array<Record<string, any>>;
  checkin: string;
  checkout: string;
  is_searching: boolean;
  rates: Array<Record<string, any>>;
  room_type?: string;
  total: number;
}

export interface CreateReservationPayload {
  booker_email: string;
  booker_email_2?: string;
  booker_firstname: string;
  booker_note?: string;
  booker_phone_number: string;
  booker_rank: string;
  booker_type: string;
  market_segment_id: string;
  no_deposit?: string;
  no_show?: string;
  note?: string;
  paid?: string;
  path_of_reservation: string;
  payment_method?: string;
  reservation_number: string;
  send_mail?: string;
}

export interface UpdateRatePayload {
  charges: Array<Record<string, any>>;
  reservation_detail_id: string;
  reservation_id: string;
}

export interface BookRoomPayload {
  id: string;
}

export interface UpdateGeneralInfoPayload {
  adults: number;
  baby: number | string;
  birthday: number | string;
  checkin_date: string;
  checkin_time: string;
  checkout_date: string;
  checkout_time: string;
  child: number;
  dropoff_required: number | string;
  dropoff_time: string;
  early_check_in: number;
  honeymoon: number | string;
  late_check_out: number;
  note: string;
  pickup_required: number | string;
  pickup_time: string;
  reservation_detail_id: string;
  reservation_id: string;
  room_type: number;
  transport_no_dropoff: string | number;
  transport_no_pickup: string | number;
}

export interface CreateReservationState {
  payload: CreateReservationPayload;
  status: string;
}

export interface UpdateRateState {
  payload: UpdateRatePayload;
  status: string;
}

export interface BookRoomState {
  payload: BookRoomPayload;
  status: string;
}

export interface ReservationAddReservationDetailPayload {
  client_info_id: string;
  reservation_id: string;
  rooms: Array<Record<string, any>>;
}

export interface AddReservationDetailState {
  payload: ReservationAddReservationDetailPayload;
  status: string;
}

export interface ReservationCancelReservationDetailPayload {
  cancel_reason: string;
  cancel_type: string;
  client_info_id: string;
  reservation_detail_id: number[];
  reservation_id: string;
}

export interface CancelReservationDetailState {
  payload: ReservationCancelReservationDetailPayload;
  status: string;
}

export interface UpdateGeneralInfoState {
  payload: UpdateGeneralInfoPayload;
  status: string;
}

export interface ReservationDetailState {
  data: Record<string, any>;
  is_finish: boolean;
  reservation_detail_id: string;
  reservation_id: string;
}

export interface GetReservationState {
  data: Record<string, any>;
  is_finish: boolean;
  reservation_id: string;
}

export interface ReservationTypeState {
  data: Record<string, any>;
  is_finish: boolean;
}

export interface RoomTypeState {
  data: Record<string, any>;
  is_finish: boolean;
}

export interface ProductSearchState {
  data: Array<Record<string, any>>;
  is_searching: boolean;
}

export interface AgentInfosState {
  data: Array<Record<string, any>>;
  is_searching: boolean;
  total: number;
}

export interface RootState {
  addReservationDetail: AddReservationDetailState;
  agentInfos: AgentInfosState;
  alerts: AlertsState;
  app: AppState;
  bookRoom: BookRoomState;
  cancelReservationDetail: CancelReservationDetailState;
  createReservation: CreateReservationState;
  getReservation: GetReservationState;
  getReservationDetail: ReservationDetailState;
  getReservationNumber: ReservationNumberState;
  getRoomType: RoomTypeState;
  github: GitHubState;
  product: ProductSearchState;
  reservation: ReservationSearchState;
  searchRoom: RoomSearchState;
  updateGeneralInfo: UpdateGeneralInfoState;
  updateRate: UpdateRateState;
  updateReservation: CreateReservationState;
  user: UserState;
}

export interface WithDispatch {
  dispatch: Dispatch;
}
