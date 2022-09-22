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

export interface CreateReservationState {
  payload: CreateReservationPayload;
  status: string;
}

export interface ReservationDetailState {
  data: Record<string, any>;
  id: string;
  is_finish: boolean;
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

export interface RootState {
  alerts: AlertsState;
  app: AppState;
  createReservation: CreateReservationState;
  getReservationDetail: ReservationDetailState;
  getReservationNumber: ReservationNumberState;
  getRoomType: RoomTypeState;
  github: GitHubState;
  product: ProductSearchState;
  reservation: ReservationSearchState;
  searchRoom: RoomSearchState;
  user: UserState;
}

export interface WithDispatch {
  dispatch: Dispatch;
}
