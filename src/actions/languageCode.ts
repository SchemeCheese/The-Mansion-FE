import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import { LanguageCodeGetResult } from 'types';

export const getLanguageCodeAction = createAction(ActionTypes.GET_LANGUAGE_CODE);

export const getLanguageCodeActionFinish = createAction(
  ActionTypes.GET_LANGUAGE_CODE_FINISH,
  (payload: LanguageCodeGetResult) => actionPayload(payload),
);
