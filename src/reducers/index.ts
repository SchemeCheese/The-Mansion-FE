import printDepositPDFReservationDetail, {
  printDepositPDFReservationDetailState,
} from 'reducers/printDepositPDFReservationDetail';

import addItem, { addItemState } from './addItem';
import addLateCheckoutFee, { addLateCheckoutFeeState } from './addLateCheckoutFee';
import addReservationDetail, { addReservationDetailState } from './addReservationDetail';
import agentInfos, { agentInfosState } from './agentInfos';
import alerts, { alertsState } from './alerts';
import app, { appState } from './app';
import bookRoom, { bookRoomState } from './bookRoom';
import branchInfo, { branchInfoState } from './branchInfo';
import cancelReservationDetail, { cancelReservationDetailState } from './cancelReservationDetail';
import changeDisk, { changeDiskState } from './changeDisk';
import changeRoom, { changeRoomState } from './changeRoom';
import channel, { channelState } from './channel';
import checkin, { checkinState } from './checkin';
import checkout, { checkoutState } from './checkout';
import createGuest, { createGuestState } from './createGuest';
import createPayment, { createPaymentState } from './createPayment';
import createReservation, { createReservationState } from './createReservation';
import deleteItem, { deleteItemState } from './deleteItem';
import downloadDocxReservationDetail, {
  downloadDocxReservationDetailState,
} from './downloadDocxReservationDetail';
import downloadPDFInvoiceTransaction, {
  downloadPDFInvoiceTransactionState,
} from './downloadPDFInvoiceTransaction';
import downloadPDFReservationDetail, {
  downloadPDFReservationDetailState,
} from './downloadPDFReservationDetail';
import fuel, { fuelState } from './fuel';
import getBranchFacilites, { getBranchFacilitesState } from './getBranchFacilites';
import getBranchHeader, { getBranchHeaderState } from './getBranchHeader';
import getBranchs, { getBranchsState } from './getBranchs';
import getElectricArea, { getElectricAreaState } from './getElectricArea';
import getElectricPower, { getElectricPowerState } from './getElectricPower';
import getElectricYesterday, { getElectricYesterdayState } from './getElectricYesterday';
import getLanguageCode, { getLanguageCodeState } from './getLanguageCode';
import notifications, { notificationsState } from './getNotification';
import getProductType, { getProductTypeState } from './getProductType';
import getReservation, { getReservationState } from './getReservation';
import getReservationByFolio, { getReservationByFolioState } from './getReservationByFolio';
import getReservationDetail, { reservationDetailState } from './getReservationDetail';
import getReservationNumber, { reservationNumberState } from './getReservationNumber';
import getRooms, { getRoomsState } from './getRooms';
import getRoomType, { roomTypeState } from './getRoomType';
import getWalkinRooms, { getWalkinRoomsState } from './getWalkinRooms';
import getWaterArea, { getWaterAreaState } from './getWaterArea';
import getWaterYesterday, { getWaterYesterdayState } from './getWaterYesterday';
import github, { githubState } from './github';
import nightAudit, { nightAuditState } from './nightAudit';
import noshow, { noshowState } from './noshow';
import printRegistrationCardPDFReservationDetail, {
  printRegistrationCardPDFReservationDetailState,
} from './printRegistrationCardPDFReservationDetail';
import product, { productSearchState } from './product';
import readNotification, { readNotificationState } from './readNotification';
import removeGuest, { removeGuestState } from './removeGuest';
import resendEmailReservation, { resendEmailReservationState } from './resendEmailReservation';
import reservation, { reservationSearchState } from './reservation';
import reservationRoomCheckinToday, {
  reservationRoomCheckinTodayState,
} from './reservationRoomCheckinToday';
import reservationRoomCheckoutToday, {
  reservationRoomCheckoutTodayState,
} from './reservationRoomCheckoutToday';
import reservationRoomInhouse, { reservationRoomInhouseState } from './reservationRoomInhouse';
import searchAvailableSchedule, { searchAvailableScheduleState } from './searchAvailableSchedule';
import searchRoom, { roomSearchState } from './searchRoom';
import searchSchedule, { searchScheduleState } from './searchSchedule';
import setMainGuest, { setMainGuestState } from './setMainGuest';
import updateGeneralInfo, { updateGeneralInfoState } from './updateGeneralInfo';
import updateGuest, { updateGuestState } from './updateGuest';
import updateNoteReservationDetail, {
  updateNoteReservationDetailState,
} from './updateNoteReservationDetail';
import updateRate, { updateRateState } from './updateRate';
import updateReservation, { updateReservationState } from './updateReservation';
import updateRoomAvailable, { updateRoomAvailableState } from './updateRoomAvailable';
import uploadFile, { uploadFileState } from './uploadFile';
import user, { userState } from './user';

export const initialState = {
  alerts: alertsState,
  app: appState,
  addLateCheckoutFee: addLateCheckoutFeeState,
  github: githubState,
  getWalkinRooms: getWalkinRoomsState,
  user: userState,
  reservation: reservationSearchState,
  createReservation: createReservationState,
  updateReservation: updateReservationState,
  searchRoom: roomSearchState,
  getReservationDetail: reservationDetailState,
  product: productSearchState,
  getReservationNumber: reservationNumberState,
  getRoomType: roomTypeState,
  getReservation: getReservationState,
  getReservationByFolio: getReservationByFolioState,
  agentInfos: agentInfosState,
  bookRoom: bookRoomState,
  updateRate: updateRateState,
  addReservationDetail: addReservationDetailState,
  cancelReservationDetail: cancelReservationDetailState,
  updateGeneralInfo: updateGeneralInfoState,
  uploadFile: uploadFileState,
  searchSchedule: searchScheduleState,
  searchAvailableSchedule: searchAvailableScheduleState,
  getProductType: getProductTypeState,
  channel: channelState,
  checkin: checkinState,
  checkout: checkoutState,
  addItem: addItemState,
  deleteItem: deleteItemState,
  createPayment: createPaymentState,
  changeDisk: changeDiskState,
  changeRoom: changeRoomState,
  createGuest: createGuestState,
  updateNoteReservationDetail: updateNoteReservationDetailState,
  resendEmailReservation: resendEmailReservationState,
  updateGuest: updateGuestState,
  updateRoomAvailable: updateRoomAvailableState,
  removeGuest: removeGuestState,
  readNotification: readNotificationState,
  reservationRoomInhouse: reservationRoomInhouseState,
  reservationRoomCheckoutToday: reservationRoomCheckoutTodayState,
  reservationRoomCheckinToday: reservationRoomCheckinTodayState,
  getLanguageCode: getLanguageCodeState,
  getRooms: getRoomsState,
  DownloadPDFReservationDetail: downloadPDFReservationDetailState,
  setMainGuest: setMainGuestState,
  downloadDocxReservationDetail: downloadDocxReservationDetailState,
  downloadPDFInvoiceTransaction: downloadPDFInvoiceTransactionState,
  getBranchHeader: getBranchHeaderState,
  getBranchs: getBranchsState,
  getBranchFacilities: getBranchFacilitesState,
  branchInfo: branchInfoState,
  notifications: notificationsState,
  noshow: noshowState,
  nightAudit: nightAuditState,
  printRegistrationCardPDFReservationDetail: printRegistrationCardPDFReservationDetailState,
  printDepositPDFReservationDetail: printDepositPDFReservationDetailState,
  fuel: fuelState,
  getElectricYesterday: getElectricYesterdayState,
  getWaterYesterday: getWaterYesterdayState,
  getElectricArea: getElectricAreaState,
  getWaterArea: getWaterAreaState,
  getElectricPower: getElectricPowerState,
};

export default {
  ...alerts,
  ...app,
  ...addLateCheckoutFee,
  ...github,
  ...user,
  ...reservation,
  ...createReservation,
  ...updateReservation,
  ...searchRoom,
  ...getReservationDetail,
  ...getWalkinRooms,
  ...product,
  ...getReservationNumber,
  ...getRoomType,
  ...getReservation,
  ...agentInfos,
  ...bookRoom,
  ...updateRate,
  ...addReservationDetail,
  ...cancelReservationDetail,
  ...updateGeneralInfo,
  ...uploadFile,
  ...searchSchedule,
  ...searchAvailableSchedule,
  ...getProductType,
  ...channel,
  ...checkin,
  ...checkout,
  ...addItem,
  ...deleteItem,
  ...createPayment,
  ...changeDisk,
  ...changeRoom,
  ...createGuest,
  ...updateNoteReservationDetail,
  ...resendEmailReservation,
  ...updateGuest,
  ...removeGuest,
  ...readNotification,
  ...reservationRoomInhouse,
  ...reservationRoomCheckinToday,
  ...reservationRoomCheckoutToday,
  ...getLanguageCode,
  ...getRooms,
  ...updateRoomAvailable,
  ...downloadPDFReservationDetail,
  ...setMainGuest,
  ...downloadDocxReservationDetail,
  ...downloadPDFInvoiceTransaction,
  ...getBranchHeader,
  ...getReservationByFolio,
  ...getBranchs,
  ...getBranchFacilites,
  ...branchInfo,
  ...notifications,
  ...noshow,
  ...nightAudit,
  ...printRegistrationCardPDFReservationDetail,
  ...printDepositPDFReservationDetail,
  ...fuel,
  ...getElectricYesterday,
  ...getWaterYesterday,
  ...getElectricArea,
  ...getWaterArea,
  ...getElectricPower,
};
