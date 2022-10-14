import { createReducer } from '@reduxjs/toolkit';

import { deleteItemAction, deleteItemActionSuccess } from 'actions/transaction';

import { DeleteItemState } from 'types';

export const deleteItemState = {
  payload: {
    sale_detail_ids: [],
    sale_info_id: '',
  },
  status: '',
};

export default {
  deleteItem: createReducer<DeleteItemState>(deleteItemState, builder => {
    builder
      .addCase(deleteItemAction, (draft, { payload }) => {
        draft.payload = payload.payload;
        draft.status = 'INIT';
      })
      .addCase(deleteItemActionSuccess, draft => {
        draft.status = 'SUCCESS';
      });
  }),
};
