import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import { AddItem, DeleteItem } from 'types';

export const addItemAction = createAction(ActionTypes.TRANSACTION_ADD_ITEM, (payload: AddItem) =>
  actionPayload(payload),
);

export const addItemActionSuccess = createAction(ActionTypes.TRANSACTION_ADD_ITEM_SUCCESS);

export const deleteItemAction = createAction(
  ActionTypes.TRANSACTION_DELETE_ITEM,
  (payload: DeleteItem) => actionPayload(payload),
);

export const deleteItemActionSuccess = createAction(ActionTypes.TRANSACTION_DELETE_ITEM_SUCCESS);
