import { notify } from 'ui/notification';
/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 03/09/2022
Updated Date : 04/09/2022
Main functions : Calendar Tab
************************************ */

/* Demo: https://github.com/fullcalendar/fullcalendar-example-projects/tree/master/react-typescript */
/* eslint no-underscore-dangle: 0 */

import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import { EventApi, EventClickArg, EventContentArg } from '@fullcalendar/core';
import { Button, Card, Col, DatePicker, Input, Modal, Row, Select } from 'ui/antd';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  createEventId,
  INITIAL_EVENTS,
} from 'pages/reservation/component/ReservationDetailTab/event-utils';
import MInput from 'components/MInput';
import reservationListStyles from 'pages/reservation/list/reservation-list.module.css';
import { getRoomType, searchScheduleAction, updateNoteReservationDetail } from 'actions';
import {
  selectRoomTypes,
  selectSearchSchedule,
  selectUpdateNoteReservationDetail,
  selectUser,
} from 'selectors';
import { useAppSelector } from 'modules/hooks';
import useTreeChanges from 'tree-changes-hook';
import { useTranslation } from 'react-i18next';
import _ from 'underscore';

interface DemoAppState {
  currentEvents: EventApi[];
  weekendsVisible: boolean;
}

const { Option } = Select;

function Calendar() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(selectUser);

  const [state, setState] = useState<DemoAppState>({
    weekendsVisible: true,
    currentEvents: [],
  });
  const [searchCondition, setSearchCondition] = useState({
    start_week_date: moment().format('YYYY-MM-DD'),
    start_date: moment().startOf('month').format('YYYY-MM-DD'),
    end_date: moment().add(1, 'weeks').format('YYYY-MM-DD'),
    room_type: '',
    room_number: '',
  });
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const [infoReservationSelected, setInfoReservationSelected] = useState({
    reservation_detail_id: '',
    reservation_info_id: '',
    title: '',
    note: '',
    folio_id: '',
  });

  const toggleShowDatePicker = () => {
    setIsShowDatePicker(!isShowDatePicker);
  };

  const searchScheduleRedux: any = useAppSelector(selectSearchSchedule);
  const updateNoteReservationDetailData: any = useAppSelector(selectUpdateNoteReservationDetail);
  const { data: roomTypesData } = useAppSelector(selectRoomTypes);
  const { changed } = useTreeChanges(searchScheduleRedux);
  const { changed: changedNote } = useTreeChanges(updateNoteReservationDetailData);
  const scheduleData = searchScheduleRedux?.data ?? {};
  const scheduleResources = Array.isArray(scheduleData?.resources) ? scheduleData.resources : [];
  const scheduleEvents = Array.isArray(scheduleData?.events) ? scheduleData.events : [];

  const fullCalendarRef: any = React.createRef();

  const handleEvents = (events: EventApi[]) => {
    setState({
      ...state,
      currentEvents: events,
    });
  };

  /* eslint prefer-const: "warn" */
  const handleChangePickDate = (date: any) => {
    const startDate = date;
    const endDate = date.clone().add(1, 'weeks');
    let temporaryState: any;

    temporaryState =
      startDate.format('MM') !== endDate.format('MM')
        ? {
            ...searchCondition,
            start_week_date: date.format('YYYY-MM-DD'),
            start_date: date.clone().startOf('month').format('YYYY-MM-DD'),
            end_date: date.clone().add(1, 'weeks').format('YYYY-MM-DD'),
          }
        : {
            ...searchCondition,
            start_week_date: date.format('YYYY-MM-DD'),
            start_date: date.clone().startOf('month').format('YYYY-MM-DD'),
            end_date: date.clone().endOf('month').format('YYYY-MM-DD'),
          };

    setSearchCondition(temporaryState);
    setIsShowDatePicker(false);
    dispatch(searchScheduleAction(temporaryState));
  };

  const [resources, setResources] = useState([]);

  useEffect(() => {
    const date = moment();
    const startDate = date;
    const endDate = date.clone().add(1, 'weeks');
    let temporaryState: any;

    temporaryState =
      startDate.format('MM') !== endDate.format('MM')
        ? {
            ...searchCondition,
            start_week_date: date.format('YYYY-MM-DD'),
            start_date: date.clone().startOf('month').format('YYYY-MM-DD'),
            end_date: date.clone().add(1, 'weeks').format('YYYY-MM-DD'),
          }
        : {
            ...searchCondition,
            start_week_date: date.format('YYYY-MM-DD'),
            start_date: date.clone().startOf('month').format('YYYY-MM-DD'),
            end_date: date.clone().endOf('month').format('YYYY-MM-DD'),
          };
    dispatch(searchScheduleAction(temporaryState));

    if ((roomTypesData?.length ?? 0) === 0) {
      dispatch(getRoomType());
    }
  }, []);

  useEffect(() => {
    setResources(scheduleResources as any);

    if (changed('is_searching', false) && fullCalendarRef.current?.getApi) {
      const calendarApi = fullCalendarRef.current.getApi().view.calendar;

      calendarApi.removeAllEvents();

      scheduleEvents.forEach((item: any) => {
        calendarApi.addEvent({
          id: createEventId(),
          title: user.permission?.reservation?.view === true ? (item?.title ?? '') : '',
          start: item?.start,
          end: item?.end,
          allDay: true,
          resourceId: item?.resourceId,
          reservationDetailId: item?.reservationDetailId,
          reservationInfoId: item?.reservationInfoId,
          note: item?.note ?? '',
          folioId: item?.folioId ?? '',
        });
      });
    }
  }, [changed, scheduleEvents, scheduleResources, user.permission]);

  useEffect(() => {
    if (changedNote('status', 'SUCCESS')) {
      notify.success(t('message.Update note successfully!'));
      dispatch(searchScheduleAction(searchCondition));
    }
  }, [changedNote]);

  const [isEventInfoModalOpen, setIsEventInfoModalOpen] = useState(false);

  const handleOk = () => {
    dispatch(
      updateNoteReservationDetail({
        payload: infoReservationSelected,
      }),
    );
    setIsEventInfoModalOpen(false);
  };

  const handleCancel = () => {
    setIsEventInfoModalOpen(false);
  };

  const showEventInfo = (clickInfo: EventClickArg) => {
    if (user.permission?.reservation?.view === true) {
      const reservation = clickInfo.event.extendedProps;

      setInfoReservationSelected({
        reservation_detail_id: reservation.reservationDetailId,
        reservation_info_id: reservation.reservationInfoId,
        title: clickInfo.event.title,
        note: reservation.note,
        folio_id: reservation.folioId,
      });

      setIsEventInfoModalOpen(true);
    }
  };

  const handleChangeNote = (event: any) => {
    setInfoReservationSelected({
      ...infoReservationSelected,
      note: event.target.value,
    });
  };

  return (
    <>
      <Row className={reservationListStyles.calendarFilterBar}>
        <Col span={24}>
          <div className={reservationListStyles.calendarFilterInline}>
            <span className={reservationListStyles.calendarFilterLabel}>
              {' '}
              {t('common.Filter')}{' '}
            </span>
            <Select
              allowClear
              aria-label={String(t('common.Room Type'))}
              className={reservationListStyles.calendarFilterSelect}
              id="calendar-filter-room-type"
              onChange={value => {
                const searchConditionStateTemporary = {
                  ...searchCondition,
                  room_type: value ?? '',
                };

                setSearchCondition(searchConditionStateTemporary);
                dispatch(searchScheduleAction(searchConditionStateTemporary));
              }}
              placeholder={t('common.Room Type')}
            >
              {_.keys(roomTypesData ?? {}).map((key: any) => {
                return (
                  <Option key={key} value={key}>
                    {roomTypesData[key]}
                  </Option>
                );
              })}
            </Select>
            <MInput
              aria-label={String(t('common.Room Number'))}
              className={reservationListStyles.calendarFilterInput}
              name="calendar_room_number"
              onChange={event =>
                setSearchCondition({
                  ...searchCondition,
                  room_number: event.target.value,
                })
              }
              onKeyUp={event => {
                if (event.key === 'Enter') {
                  dispatch(searchScheduleAction(searchCondition));
                }
              }}
              placeholder={t('common.Room Number')}
            />
            <span className={reservationListStyles.calendarDisplayLabel}>
              {t('common.Display')}
            </span>
          </div>
        </Col>
      </Row>
      <Row className={reservationListStyles.calendarTimelineRow}>
        <Col
          className={`${reservationListStyles.scheduleCalendar} ${reservationListStyles.calendarTimeline}`}
          span={24}
        >
          <svg
            className={reservationListStyles.calendarArrow}
            fill="none"
            height="14"
            onClick={() =>
              handleChangePickDate(moment(searchCondition.start_week_date).subtract(1, 'day'))
            }
            style={{ marginRight: 25 }}
            viewBox="0 0 8 14"
            width="8"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.31581 -2.99071e-08C7.16558 -3.64738e-08 7.01378 0.0583849 6.88703 0.175155L0.255074 6.39497C0.0938919 6.5464 -6.37836e-07 6.77447 -6.48444e-07 7.01713C-6.58971e-07 7.25797 0.0938919 7.48786 0.255074 7.63747L6.85886 13.8244C7.15306 14.0999 7.5834 14.0452 7.8197 13.7022C8.05599 13.3592 8.00905 12.8574 7.71485 12.5819L1.77457 7.01531L7.74458 1.41766C8.03878 1.14215 8.08573 0.640409 7.84943 0.297399C7.71329 0.102174 7.51611 -2.11515e-08 7.31581 -2.99071e-08Z"
              fill="#1D39C4"
            />
          </svg>
          <b
            aria-hidden="true"
            className={reservationListStyles.calendarTitleDate}
            onClick={toggleShowDatePicker}
            role="button"
            tabIndex={0}
          >
            {moment(searchCondition.start_week_date).format('MMMM Y')}
          </b>
          <DatePicker
            allowClear={false}
            aria-label="Calendar month picker"
            cellRender={(current, info) => {
              if (info.type !== 'date') {
                return info.originNode;
              }

              const cellDate: any = current;
              const style: React.CSSProperties = {};

              if (cellDate.day() === 0 || cellDate.day() === 6) {
                style.color = 'red';
              }

              return (
                <div className="ant-picker-cell-inner" style={style}>
                  {cellDate.date()}
                </div>
              );
            }}
            defaultValue={moment()}
            format="MMMM Y"
            id="reservation-calendar-month-picker"
            onChange={date => handleChangePickDate(date)}
            open={isShowDatePicker}
          />
          <svg
            className={reservationListStyles.calendarArrow}
            fill="none"
            height="14"
            onClick={() =>
              handleChangePickDate(moment(searchCondition.start_week_date).add(1, 'day'))
            }
            style={{ marginLeft: 25 }}
            viewBox="0 0 8 14"
            width="8"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.684193 -2.99071e-08C0.834422 -3.64738e-08 0.986215 0.0583849 1.11297 0.175155L7.74493 6.39497C7.90611 6.5464 8 6.77447 8 7.01713C8 7.25797 7.90611 7.48786 7.74493 7.63747L1.14114 13.8244C0.846941 14.0999 0.4166 14.0452 0.180303 13.7022C-0.0559934 13.3592 -0.00904711 12.8574 0.28515 12.5819L6.22543 7.01531L0.255417 1.41766C-0.0387803 1.14215 -0.0857267 0.640409 0.15057 0.297399C0.286714 0.102174 0.483889 -2.11515e-08 0.684193 -2.99071e-08Z"
              fill="#1D39C4"
            />
          </svg>
          {searchScheduleRedux.is_searching === false ? (
            <FullCalendar
              ref={fullCalendarRef}
              eventClick={showEventInfo}
              eventContent={renderEventContent}
              eventsSet={handleEvents}
              headerToolbar={{
                left: '',
                right: 'timeGridWeekly,timeGridMonthly',
              }}
              initialDate={searchCondition.start_week_date}
              initialEvents={INITIAL_EVENTS}
              initialView="timeGridWeekly"
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimelinePlugin]}
              resourceAreaColumns={[
                {
                  field: 'title',
                  headerContent: t('reservation.Room No'),
                },
                {
                  field: 'room_type_text',
                  headerContent: t('common.Room Type'),
                },
              ]}
              // resources={`${process.env.REACT_APP_API_HOST}/resources`}
              resources={resources} // alternatively, use the `events` setting to fetch from a feed
              titleFormat={{
                month: 'short',
                year: 'numeric',
                day: 'numeric',
              }}
              viewClassNames="calendar-table"
              views={{
                timeGridMonthly: {
                  type: 'resourceTimelineMonth',
                  duration: { month: 1 },
                  slotDuration: { days: 1 },
                  slotLabelFormat(argument) {
                    return moment(argument.date).format('DD[\n]dd');
                  },
                  slotLaneContent(argument) {
                    const days: string[] = [];

                    for (
                      let index = 0;
                      index < searchScheduleRedux.data?.resources?.length;
                      index++
                    ) {
                      days.push(moment(argument.date).format('DD'));
                    }

                    return days.join('\n');
                  },
                  slotLaneClassNames: 'slot-fc-day-monthly',
                  buttonText: t('common.Monthly'),
                },
                timeGridWeekly: {
                  type: 'resourceTimelineWeek',
                  duration: { days: 7 },
                  slotDuration: { days: 1 },
                  slotLabelFormat(argument) {
                    return moment(argument.date).format('DD[\n]dd');
                  },
                  slotLaneContent(argument) {
                    const days: string[] = [];

                    for (
                      let index = 0;
                      index < searchScheduleRedux.data?.resources?.length;
                      index++
                    ) {
                      days.push(moment(argument.date).format('DD'));
                    }

                    return days.join('\n');
                  },
                  slotLaneClassNames: 'slot-fc-day-weekly',
                  slotLabelClassNames: 'monthly',
                  buttonText: t('common.Weekly'),
                },
              }}
              weekends
            />
          ) : null}
        </Col>
      </Row>
      {/* Calendar note */}
      <Modal
        centered
        closable={false}
        footer={[
          <Button key="back" onClick={handleCancel} style={{ borderRadius: 4 }}>
            {t('common.Cancel')}
          </Button>,
          <Button
            key="submit"
            onClick={handleOk}
            style={{ backgroundColor: '#1D39C4', borderRadius: 4 }}
            type="primary"
          >
            {t('common.Update')}
          </Button>,
        ]}
        onCancel={handleCancel}
        onOk={handleOk}
        open={isEventInfoModalOpen}
        title={
          <Row>
            <Col className={reservationListStyles.modalTitleCol} span={12}>
              <b>{t('common.Notes')}</b>
            </Col>
            <Col className={reservationListStyles.modalTitleCol} span={12}>
              <Button
                onClick={() =>
                  navigate(`/reservation/${infoReservationSelected.reservation_info_id}`)
                }
                style={{ float: 'right' }}
              >
                {t('common.More Detail')}
              </Button>
            </Col>
          </Row>
        }
        width={644}
      >
        <Card
          className={reservationListStyles.calendarNotesCard}
          style={{ width: '100%' }}
          title={
            <span style={{ color: '#1D39C4', fontWeight: 400, fontSize: 13 }}>
              {infoReservationSelected.folio_id} - {infoReservationSelected.title}
            </span>
          }
        >
          <Input.TextArea
            defaultValue={infoReservationSelected.note}
            name="note_calendar"
            onChange={event => handleChangeNote(event)}
            placeholder={t('reservation.Input notes')}
            rows={8}
          />
        </Card>
      </Modal>
    </>
  );
}

const renderEventContent = (eventContent: EventContentArg) => {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  );
};

export default Calendar;
