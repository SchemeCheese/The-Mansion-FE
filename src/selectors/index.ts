import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

export const selectApp = createSelector(
  (state: RootState) => state.app,
  app => app,
);

export const selectGitHub = createSelector(
  (state: RootState) => state.github,
  github => github,
);

export const selectUser = createSelector(
  (state: RootState) => state.user,
  user => user,
);

export const selectCreateReservation = createSelector(
  (state: RootState) => state.createReservation,
  createReservation => createReservation,
);

export const selectGetReservationDetail = createSelector(
  (state: RootState) => state.getReservationDetail,
  getReservationDetail => getReservationDetail,
);

export const selectUpdateReservation = createSelector(
  (state: RootState) => state.updateReservation,
  updateReservation => updateReservation,
);

export const selectUpdateRate = createSelector(
  (state: RootState) => state.updateRate,
  updateRate => updateRate,
);

export const selectAddReservationDetail = createSelector(
  (state: RootState) => state.addReservationDetail,
  addReservationDetail => addReservationDetail,
);

export const selectCancelReservationDetail = createSelector(
  (state: RootState) => state.cancelReservationDetail,
  cancelReservationDetail => cancelReservationDetail,
);

export const selectUpdateGeneralInfo = createSelector(
  (state: RootState) => state.updateGeneralInfo,
  updateGeneralInfo => updateGeneralInfo,
);

export const selectBookRoom = createSelector(
  (state: RootState) => state.bookRoom,
  bookRoom => bookRoom,
);

export const selectSearchSchedule = createSelector(
  (state: RootState) => state.searchSchedule,
  searchSchedule => searchSchedule,
);

export const selectAvailableSearchSchedule = createSelector(
  (state: RootState) => state.searchAvailableSchedule,
  searchAvailableSchedule => searchAvailableSchedule,
);

export const selectChannel = createSelector(
  (state: RootState) => state.channel,
  channel => channel,
);

export const selectAddItem = createSelector(
  (state: RootState) => state.addItem,
  addItem => addItem,
);

export const selectDeleteItem = createSelector(
  (state: RootState) => state.deleteItem,
  deleteItem => deleteItem,
);
