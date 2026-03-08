import { RootState } from 'types';

export const selectApp = (state: RootState) => state.app;

export const selectGitHub = (state: RootState) => state.github;

export const selectUser = (state: RootState) => state.user;

export const selectReservationSearch = (state: RootState) => state.reservation;

export const selectSearchRoom = (state: RootState) => state.searchRoom;

export const selectCreateReservation = (state: RootState) => state.createReservation;

export const selectGetReservationDetail = (state: RootState) => state.getReservationDetail;

export const selectGetReservation = (state: RootState) => state.getReservation;

export const selectUpdateReservation = (state: RootState) => state.updateReservation;

export const selectUpdateRate = (state: RootState) => state.updateRate;

export const selectAddReservationDetail = (state: RootState) => state.addReservationDetail;

export const selectCancelReservationDetail = (state: RootState) => state.cancelReservationDetail;

export const selectUpdateGeneralInfo = (state: RootState) => state.updateGeneralInfo;

export const selectBookRoom = (state: RootState) => state.bookRoom;

export const selectSearchSchedule = (state: RootState) => state.searchSchedule;

export const selectAvailableSearchSchedule = (state: RootState) => state.searchAvailableSchedule;

export const selectChannel = (state: RootState) => state.channel;

export const selectAddDisk = (state: RootState) => state.addDisk;

export const selectAddItem = (state: RootState) => state.addItem;

export const selectDeleteItem = (state: RootState) => state.deleteItem;

export const selectChangeDisk = (state: RootState) => state.changeDisk;

export const selectCreatePayment = (state: RootState) => state.createPayment;

export const selectCreateGuest = (state: RootState) => state.createGuest;

export const selectUpdateGuest = (state: RootState) => state.updateGuest;

export const selectRemoveGuest = (state: RootState) => state.removeGuest;

export const selectUpdateNoteReservationDetail = (state: RootState) =>
  state.updateNoteReservationDetail;

export const selectResendEmailReservation = (state: RootState) => state.resendEmailReservation;

export const selectUploadFile = (state: RootState) => state.uploadFile;

export const selectGetLanguageCode = (state: RootState) => state.getLanguageCode;

export const selectGetRooms = (state: RootState) => state.getRooms;

export const selectUpdateRoomAvailable = (state: RootState) => state.updateRoomAvailable;

export const selectDownloadPDFReservationDetail = (state: RootState) =>
  state.downloadPDFReservationDetail;

export const selectSetMainGuest = (state: RootState) => state.setMainGuest;

export const selectBranchManagerState = (state: RootState) => state.getBranchManager;

export const selectReservationByFolio = (state: RootState) => state.getReservationByFolio;

export const selectChangeRoom = (state: RootState) => state.changeRoom;

export const selectGetBranchs = (state: RootState) => state.getBranchs;

export const selectFacilitesByBranch = (state: RootState) => state.getBranchFacilites;

export const selectBranchInfo = (state: RootState) => state.branchInfo;

export const selectRoomTypes = (state: RootState) => state.getRoomType;

export const selectRoomOptions = (state: RootState) => state.getRoomOption;

export const selectNotifications = (state: RootState) => state.notifications;

export const selectGetWalkinRooms = (state: RootState) => state.getWalkinRooms;

export const selectReservationRoomInhouseState = (state: RootState) => state.reservationRoomInhouse;

export const selectReservationRoomCheckoutTodayState = (state: RootState) =>
  state.reservationRoomCheckoutToday;

export const selectReservationRoomCheckinTodayState = (state: RootState) =>
  state.reservationRoomCheckinToday;

export const selectFuelState = (state: RootState) => state.fuel;

export const selectNoShowState = (state: RootState) => state.noshow;

export const selectNightAuditState = (state: RootState) => state.nightAudit;

export const selectElectricYesterdayState = (state: RootState) => state.getElectricYesterday;

export const selectWaterYesterdayState = (state: RootState) => state.getWaterYesterday;

export const selectCheckinState = (state: RootState) => state.checkin;

export const selectElectricAreaState = (state: RootState) => state.getElectricArea;

export const selectWaterAreaState = (state: RootState) => state.getWaterArea;

export const selectAddLateCheckoutFeeState = (state: RootState) => state.addLateCheckoutFee;

export const selectCheckoutState = (state: RootState) => state.checkout;

export const selectElectricPowerState = (state: RootState) => state.getElectricPower;

export const selectDeviceManagerState = (state: RootState) => state.getDeviceManager;

export const selectDurationCurveState = (state: RootState) => state.getDurationCurve;

export const selectHouseKeepingState = (state: RootState) => state.getHouseKeeping;

export const selectGetReservationCheckoutFromRoomNo = (state: RootState) =>
  state.getReservationCheckoutFromRoomNo;

export const selectCreateQRCodeVNPayState = (state: RootState) => state.createQRCodeVNPay;

export const selectCustomerSearch = (state: RootState) => state.customer;

export const selectGetCustomerDetail = (state: RootState) => state.getCustomerDetail;

export const selectGuestCheckin = (state: RootState) => state.guestCheckin;

export const selectGetMonthlyInvoices = (state: RootState) => state.getMonthlyInvoice;

export const selectPaymentMonthlyInvoices = (state: RootState) => state.paymentMonthlyInvoice;

export const selectUpdateHouseKeeping = (state: RootState) => state.updateHouseKeeping;

export const selectUpdatePaymentDetail = (state: RootState) => state.updatePaymentDetail;

export const selectGetFacility = (state: RootState) => state.getFacility;
