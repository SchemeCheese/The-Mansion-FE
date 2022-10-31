import { createReducer } from '@reduxjs/toolkit';

import { getLanguageCodeAction, getLanguageCodeActionFinish } from 'actions';

import { LanguageCodeState } from 'types';

export const getLanguageCodeState = {
  is_searching: false,
  items: [],
};

export default {
  getLanguageCode: createReducer<LanguageCodeState>(getLanguageCodeState, builder => {
    builder
      .addCase(getLanguageCodeAction, draft => {
        draft.is_searching = true;
      })
      .addCase(getLanguageCodeActionFinish, (draft, { payload }) => {
        draft.items = payload.items;
        draft.is_searching = false;
      });
  }),
};
