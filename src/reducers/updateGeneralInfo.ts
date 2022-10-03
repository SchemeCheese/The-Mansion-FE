import { createReducer } from '@reduxjs/toolkit';

import { updateGeneralInfo, updateGeneralInfoSuccess } from 'actions';

import { UpdateGeneralInfoState } from 'types';

export const updateGeneralInfoState = {
  payload: {
    adults: 0,
    baby: 0,
    birthday: 0,
    checkin_date: '',
    checkin_time: '',
    checkout_date: '',
    checkout_time: '',
    child: 0,
    dropoff_required: 0,
    dropoff_time: '',
    early_check_in: 0,
    honeymoon: 0,
    late_check_out: 0,
    note: '',
    pickup_required: 0,
    pickup_time: '',
    reservation_id: '',
    reservation_detail_id: '',
    room_type: 0,
    transport_no_dropoff: '',
    transport_no_pickup: '',
  },
  status: '',
};

export default {
  updateGeneralInfo: createReducer<UpdateGeneralInfoState>(updateGeneralInfoState, builder => {
    builder
      .addCase(updateGeneralInfo, (draft, { payload }) => {
        draft.payload = payload.payload;
        draft.status = 'INIT';
      })
      .addCase(updateGeneralInfoSuccess, draft => {
        draft.status = 'SUCCESS';
      });
  }),
};
