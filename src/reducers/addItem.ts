import { createReducer } from '@reduxjs/toolkit';

import { addItemAction, addItemActionSuccess } from 'actions/transaction';

import { AddItemState } from 'types';

export const addItemState = {
  payload: {
    items: [],
    reservation_id: '',
    reservation_detail_id: '',
  },
  status: '',
};

export default {
  addItem: createReducer<AddItemState>(addItemState, builder => {
    builder
      .addCase(addItemAction, (draft, { payload }) => {
        draft.payload = payload.payload;
        draft.status = 'INIT';
      })
      .addCase(addItemActionSuccess, draft => {
        draft.status = 'SUCCESS';
      });
  }),
};
