import { createReducer } from '@reduxjs/toolkit';

import { bookRoom, bookRoomSuccess } from 'actions';

import { BookRoomState } from 'types';

export const bookRoomState = {
  payload: {
    id: '',
  },
  status: '',
};

export default {
  bookRoom: createReducer<BookRoomState>(bookRoomState, builder => {
    builder
      .addCase(bookRoom, (draft, { payload }) => {
        draft.payload = payload.payload;
        draft.status = 'INIT';
      })
      .addCase(bookRoomSuccess, draft => {
        draft.status = 'SUCCESS';
      });
  }),
};
