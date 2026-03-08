/** ***********************************
Module Name: Checkin
Developer Name: ThuLt
Created Date: 15/07/2023
Updated Date: 15/07/2023
Main functions: Guest Checkin
************************************ */

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Col, Input, Row } from 'ui/antd';
import { formatNumber } from 'helpers';
import { sumBy } from 'lodash';
import moment from 'moment';
import { selectCheckinState, selectGuestCheckin } from 'selectors';
import useTreeChanges from 'tree-changes-hook';

import { useAppSelector } from 'modules/hooks';

import { checkinAction } from 'actions';
import layoutStyles from 'components/layout.module.css';

import PattonButton from 'components/PattonButton';

interface Props {
  setVisiable: (visible: boolean) => void;
  visible: boolean;
}

function ConfirmReservation() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkinData = useAppSelector(selectCheckinState);
  const { changed } = useTreeChanges(checkinData);

  const handleCheckin = () => {
    dispatch(
      checkinAction({
        payload: {
          reservation_id: checkinReservationData.reservation.id,
          hide_room_rate: true,
          print_registration_card: false,
          reservation_detail: [
            {
              id: checkinReservationData.id,
              early_checkin_fee: {
                hour_total: 0,
                sale_price: 0,
              },
            },
          ],
        },
      }),
    );
  };

  const checkinReservationState = useAppSelector(selectGuestCheckin);
  const checkinReservationData: any = checkinReservationState.data;
  const reservationInfo = checkinReservationData.reservation;

  useEffect(() => {
    if (changed('status', 'SUCCESS')) {
      navigate('/guest/checkin/finish');
    }
  }, [changed]);

  return (
    <Row
      className={`${layoutStyles.content} guest-payment-content guest-checkout-content`}
      style={{
        background: 'white',
        width: '90%',
        marginLeft: '5%',
        marginTop: '5vh',
        marginBottom: 10,
      }}
    >
      {' '}
      <Row className="w-100">
        <Col className="pt-15" span={12} style={{ textAlign: 'left' }}>
          <Row>
            <span className="span-header">{t('guestCheckin.Thông tin đặt phòng')} / </span>
            <span className="span-header span-header-right span-blur">
              {t('guestCheckin.Reservation Information')}
            </span>
          </Row>
          <Row className="h-100">
            <Col
              span={24}
              style={{
                paddingRight: 20,
              }}
            >
              <Row style={{ paddingTop: 12 }}>
                <Col span={16}>
                  <span>Ngày tạo / </span>
                  <span className="reservation-information_span">Date : </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right">
                    {moment(checkinReservationData.created_date).format('DD/MM/YYYY')}
                  </span>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span>Tên khách / </span>
                  <span className="reservation-information_span">Guest Name: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right">
                    {checkinReservationData.guest_name}
                  </span>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span>Đặt phòng qua / </span>
                  <span className="reservation-information_span">Booking Via: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right">
                    {checkinReservationData.source_ta}
                  </span>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span>Tổng tiền phòng / </span>
                  <span className="reservation-information_span">Room Fee: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right">
                    {formatNumber(
                      sumBy(checkinReservationData.charges, function (item: any) {
                        return item.actual_amount;
                      }),
                    )}
                  </span>
                </Col>
              </Row>
              <Row style={{ paddingBottom: 15 }}>
                <Col span={16}>
                  <span>Ghi chú / </span>
                  <span className="reservation-information_span">Notes: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right">
                    {checkinReservationData.note}
                  </span>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span>Mã số đặt phòng / </span>
                  <span className="reservation-information_span">Reservation No: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right">
                    {checkinReservationData.reservation_number}
                  </span>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span>Số phòng / </span>
                  <span className="reservation-information_span">Room Number: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right"> 14 </span>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span>Ngày đến / </span>
                  <span className="reservation-information_span">Checkin Date: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right">
                    {moment(checkinReservationData.checkin).format('DD/MM/YYYY')}
                  </span>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span>Ngày đi / </span>
                  <span className="reservation-information_span">Checkout Date: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right">
                    {moment(checkinReservationData.checkout).format('DD/MM/YYYY')}
                  </span>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span>Số đêm / </span>
                  <span className="reservation-information_span">Nights: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right">
                    {moment(checkinReservationData.checkout).diff(
                      moment(checkinReservationData.checkin),
                      'days',
                    )}
                  </span>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span>Số khách / </span>
                  <span className="reservation-information_span">Guests: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right">
                    {formatNumber(
                      checkinReservationData.adults +
                        checkinReservationData.child +
                        checkinReservationData.baby,
                    )}
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col className="pt-15" span={12} style={{ paddingLeft: 30 }}>
          <Row style={{ paddingBottom: 15 }}>
            <span className="span-header"> {t('guestCheckin.Thông tin liên hệ')} / </span>
            <span className="span-header span-header-right span-blur">
              {t('guestCheckin.Contact Information')}
            </span>
          </Row>
          <Row className="h-100">
            <Col
              span={24}
              style={{
                paddingRight: 20,
              }}
            >
              <Row style={{ paddingTop: 12 }}>
                <Col span={16}>
                  <span>Địa chỉ email / </span>
                  <span className="reservation-information_span">Email : </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right">
                    {reservationInfo.booker.email_address1}
                  </span>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span>Điện thoại / </span>
                  <span className="reservation-information_span">Phone: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right">
                    {reservationInfo.booker.telephone_number1}
                  </span>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span> Quốc tịch / </span>
                  <span className="reservation-information_span">Nationality: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right" />
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span>Ngày sinh / </span>
                  <span className="reservation-information_span">DOB: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right">
                    {reservationInfo.booker.date_of_birth}
                  </span>
                </Col>
              </Row>
              <Row style={{ paddingBottom: 15 }}>
                <Col span={16}>
                  <span>Ghi chú / </span>
                  <span className="reservation-information_span">Notes: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right" />
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span>Chứng minh thư / </span>
                  <span className="reservation-information_span">Identification No: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right"> </span>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span>Số hộ chiếu / </span>
                  <span className="reservation-information_span">Passport No: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right"> </span>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span>Hạn hộ chiếu / </span>
                  <span className="reservation-information_span">Expiry Date: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right" />
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span>Số thị thực / </span>
                  <span className="reservation-information_span">Visa No: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right" />
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span>Hạn thị thực / </span>
                  <span className="reservation-information_span">Expiry Date: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right"> </span>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="w-100" style={{ paddingTop: '2%' }}>
        <Col span={24}>
          <span className="span-header">{t('guestCheckin.Quy định của khách sạn')} /</span>
          <span className="span-header span-header-right span-blur">
            {t('guestCheckin.Hotel Regulation')}
          </span>
        </Col>
      </Row>
      <Row>
        <Col className="pt-15" span={12} style={{ textAlign: 'left' }}>
          <Row>
            <span>• Giờ nhận phòng /</span>
            <span className="reservation-information_span span-header-right">Checkin Time: </span>
            15h00
          </Row>
          <Row>
            <span>• Giờ trả phòng /</span>
            <span className="reservation-information_span span-header-right">Checkout Time: </span>
            Before 12h00
          </Row>
          <Row>
            <span>• Trẻ em sử dụng hồ bơi phải có sự giám sát của ba mẹ</span>
          </Row>
          <Row>
            <span className="span-blur">
              (Childrens using pools must be full observed by parents.)
            </span>
          </Row>
        </Col>
        <Col className="pt-15 pl-15" span={12}>
          <Row className="pl-15">
            <span>
              Trong phòng được cung cấp tủ két sắt, quý khách tự bảo quản tài sản của mình. Villa sẽ
              không chịu trách nhiệm thất lạc tài sản của quý khách.{' '}
            </span>
            <span className="span-blur">
              (In room with safe box provined for guest properties kept. The villa shall not liable
              for any loss. )
            </span>
          </Row>
        </Col>
      </Row>
      <Row className="w-100">
        <Col className="pt-15" span={12} style={{ textAlign: 'left' }}>
          <Row className="pr-15">
            <Col className="pb-15">
              <span className="span-header"> {t('guestCheckin.Yêu cầu đặc biệt')} / </span>
              <span className="span-header span-header-right span-blur">
                {t('guestCheckin.Other Note')}
              </span>
            </Col>
            <Input.TextArea
              name="note"
              placeholder={t('guestCheckin.Please input your note')}
              rows={8}
              style={{ height: 100 }}
            />
          </Row>
        </Col>
        <Col className="pt-15 pb-15 pl-15" span={12}>
          <Row className="pl-15">
            <Col className="pb-15">
              <span className="span-header"> Chữ ký /</span>
              <span className="span-header span-header-right span-blur">Signature</span>
            </Col>
            <Input.TextArea name="note" rows={8} style={{ height: 100 }} />
          </Row>
        </Col>
        <Col span={24} style={{ marginTop: 25, textAlign: 'center' }}>
          {/* <MButton onClick={handleCancel}>{t('common.Cancel')}</MButton> */}
          <PattonButton
            // disabled={!(isCash || isMomo || (isVNPay && isPaymentSuccess))}
            onClick={handleCheckin}
            style={{ marginLeft: 20 }}
          >
            {t('common.Checkin')}
          </PattonButton>
        </Col>
      </Row>
    </Row>
  );
}

export default ConfirmReservation;
