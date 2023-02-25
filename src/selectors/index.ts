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

export const selectReservationSearch = createSelector(
  (state: RootState) => state.reservation,
  reservation => reservation,
);

export const selectCreateReservation = createSelector(
  (state: RootState) => state.createReservation,
  createReservation => createReservation,
);

export const selectGetReservationDetail = createSelector(
  (state: RootState) => state.getReservationDetail,
  getReservationDetail => getReservationDetail,
);

export const selectGetReservation = createSelector(
  (state: RootState) => state.getReservation,
  getReservation => getReservation,
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

export const selectChangeDisk = createSelector(
  (state: RootState) => state.changeDisk,
  changeDisk => changeDisk,
);

export const selectCreatePayment = createSelector(
  (state: RootState) => state.createPayment,
  createPayment => createPayment,
);

export const selectCreateGuest = createSelector(
  (state: RootState) => state.createGuest,
  createGuest => createGuest,
);

export const selectUpdateGuest = createSelector(
  (state: RootState) => state.updateGuest,
  updateGuest => updateGuest,
);

export const selectRemoveGuest = createSelector(
  (state: RootState) => state.removeGuest,
  removeGuest => removeGuest,
);

export const selectUpdateNoteReservationDetail = createSelector(
  (state: RootState) => state.updateNoteReservationDetail,
  updateNoteReservationDetail => updateNoteReservationDetail,
);

export const selectResendEmailReservation = createSelector(
  (state: RootState) => state.resendEmailReservation,
  resendEmailReservation => resendEmailReservation,
);

export const selectUploadFile = createSelector(
  (state: RootState) => state.uploadFile,
  uploadFile => uploadFile,
);

export const selectGetLanguageCode = createSelector(
  (state: RootState) => state.getLanguageCode,
  getLanguageCode => getLanguageCode,
);

export const selectGetRooms = createSelector(
  (state: RootState) => state.getRooms,
  getRooms => getRooms,
);

export const selectUpdateRoomAvailable = createSelector(
  (state: RootState) => state.updateRoomAvailable,
  updateRoomAvailable => updateRoomAvailable,
);

export const selectDownloadPDFReservationDetail = createSelector(
  (state: RootState) => state.downloadPDFReservationDetail,
  downloadPDFReservationDetail => downloadPDFReservationDetail,
);

export const selectSetMainGuest = createSelector(
  (state: RootState) => state.setMainGuest,
  setMainGuest => setMainGuest,
);

export const selectBranchHeader = createSelector(
  (state: RootState) => state.getBranchHeader,
  getBranchHeader => getBranchHeader,
);
export const selectBranchManagerState = createSelector(
  (state: RootState) => state.getBranchManager,
  getBranchManager => getBranchManager,
);

export const selectReservationByFolio = createSelector(
  (state: RootState) => state.getReservationByFolio,
  getReservationByFolio => getReservationByFolio,
);

export const selectChangeRoom = createSelector(
  (state: RootState) => state.changeRoom,
  changeRoom => changeRoom,
);

export const selectGetBranchs = createSelector(
  (state: RootState) => state.getBranchs,
  getBranchs => getBranchs,
);

export const selectFacilitesByBranch = createSelector(
  (state: RootState) => state.getBranchFacilites,
  getBranchFacilites => getBranchFacilites,
);

export const selectBranchInfo = createSelector(
  (state: RootState) => state.branchInfo,
  branchInfo => branchInfo,
);

export const selectRoomTypes = createSelector(
  (state: RootState) => state.getRoomType,
  getRoomType => getRoomType,
);

export const selectNotifications = createSelector(
  (state: RootState) => state.notifications,
  notifications => notifications,
);

export const selectGetWalkinRooms = createSelector(
  (state: RootState) => state.getWalkinRooms,
  getWalkinRooms => getWalkinRooms,
);

export const selectReservationRoomInhouseState = createSelector(
  (state: RootState) => state.reservationRoomInhouse,
  reservationRoomInhouse => reservationRoomInhouse,
);

export const selectReservationRoomCheckoutTodayState = createSelector(
  (state: RootState) => state.reservationRoomCheckoutToday,
  reservationRoomCheckoutToday => reservationRoomCheckoutToday,
);

export const selectReservationRoomCheckinTodayState = createSelector(
  (state: RootState) => state.reservationRoomCheckinToday,
  reservationRoomCheckinToday => reservationRoomCheckinToday,
);

export const selectFuelState = createSelector(
  (state: RootState) => state.fuel,
  fuel => fuel,
);

export const selectNoShowState = createSelector(
  (state: RootState) => state.noshow,
  noshow => noshow,
);

export const selectNightAuditState = createSelector(
  (state: RootState) => state.nightAudit,
  nightAudit => nightAudit,
);

export const selectElectricYesterdayState = createSelector(
  (state: RootState) => state.getElectricYesterday,
  getElectricYesterday => getElectricYesterday,
);

export const selectWaterYesterdayState = createSelector(
  (state: RootState) => state.getWaterYesterday,
  getWaterYesterday => getWaterYesterday,
);

export const selectCheckinState = createSelector(
  (state: RootState) => state.checkin,
  checkin => checkin,
);

export const selectElectricAreaState = createSelector(
  (state: RootState) => state.getElectricArea,
  getElectricArea => getElectricArea,
);

export const selectWaterAreaState = createSelector(
  (state: RootState) => state.getWaterArea,
  getWaterArea => getWaterArea,
);

export const selectAddLateCheckoutFeeState = createSelector(
  (state: RootState) => state.addLateCheckoutFee,
  addLateCheckoutFee => addLateCheckoutFee,
);

export const selectCheckoutState = createSelector(
  (state: RootState) => state.checkout,
  checkout => checkout,
);

export const selectElectricPowerState = createSelector(
  (state: RootState) => state.getElectricPower,
  getElectricPower => getElectricPower,
);

export const selectDeviceManagerState = createSelector(
  (state: RootState) => state.getDeviceManager,
  getDeviceManager => getDeviceManager,
);

export const selectDurationCurveState = createSelector(
  (state: RootState) => state.getDurationCurve,
  getDurationCurve => getDurationCurve,
);
