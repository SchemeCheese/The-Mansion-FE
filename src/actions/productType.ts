import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import { ProductTypeResult } from 'types';

export const productType = createAction(ActionTypes.PRODUCT_TYPE_GET, (payload: any) =>
  actionPayload(payload),
);

export const productTypeFinish = createAction(
  ActionTypes.PRODUCT_TYPE_GET_FINISH,
  (payload: ProductTypeResult) => actionPayload(payload),
);
