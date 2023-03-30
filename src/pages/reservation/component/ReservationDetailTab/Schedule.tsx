/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 03/09/2022
Updated Date : 04/12/2022
Main functions : Schedule Tab
************************************ */

/* Demo: https://github.com/fullcalendar/fullcalendar-example-projects/tree/master/react-typescript */
/* eslint simple-import-sort/imports: 0 */
/* eslint no-underscore-dangle: 0 */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import FullCalendar, {
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventContentArg,
  EventChangeArg,
} from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Checkbox, Col, DatePicker, Form, Row, Select, message } from 'antd';
import moment from 'moment';
import useTreeChanges from 'tree-changes-hook';
import { useAppSelector } from 'modules/hooks';
import {
  selectBookRoom,
  selectGetReservationDetail,
  selectAvailableSearchSchedule,
  selectRoomTypes,
  selectUser,
} from 'selectors';

import PattonButton from 'components/PattonButton';
import { RootState } from 'types';

import {
  createEventId,
  INITIAL_EVENTS,
} from 'pages/reservation/component/ReservationDetailTab/event-utils';
import {
  bookRoom,
  getReservation,
  getReservationDetail,
  searchAvailableScheduleAction,
} from 'actions';
import { getDaysBetweenDates, onlyUnique } from 'helpers';
import _ from 'underscore';

interface DemoAppState {
  currentEvents: EventApi[];
  weekendsVisible: boolean;
}

const { Option } = Select;

interface Props {
  reservationDetailId: string;
  reservationId: string;
}

function Schedule({ reservationDetailId, reservationId }: Props) {
  const [state, setState] = useState<DemoAppState>({
    weekendsVisible: true,
    currentEvents: [],
  });
  const bookRoomData = useAppSelector(selectBookRoom);
  const { changed } = useTreeChanges(bookRoomData);

  const reservationDetailData = useAppSelector(selectGetReservationDetail);
  const searchAvailableEventsData: any = useAppSelector(selectAvailableSearchSchedule);
  const user = useAppSelector(selectUser);

  const reservationDetailInfo: any = useSelector<RootState>(
    ({ getReservationDetail: getReservationDetailTemporary }) => getReservationDetailTemporary.data,
  );
  const { data: roomTypesData } = useAppSelector(selectRoomTypes);

  const params = useLocation();
  const searchParam = new URLSearchParams(params.search);
  const roomTypeParam = searchParam.get('room_type');

  const [searchScheduleCondition, setSearchScheduleCondition] = useState<any>({
    direction: '',
    end_date: reservationDetailInfo.checkout,
    floor: '',
    reservation_detail_id: reservationDetailId,
    room_type: roomTypeParam || reservationDetailInfo.room_type,
    start_date: reservationDetailInfo.checkin,
    view: '',
    isSmocking: undefined,
  });

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const fullCalendarRef: any = React.createRef();

  const { changed: changedEvents } = useTreeChanges(reservationDetailData);
  // const { changed: changedAvailableEvents } = useTreeChanges(searchAvailableEventsData);

  const isValidSelectRoom = (bookRoomInfoData: any) => {
    const rateNumber: any = {};
    const validationNight: any = {};
    const availableEvents: any = {};

    reservationDetailInfo.charges.forEach((rItem: any) => {
      rateNumber[rItem.use_date] = (rateNumber[rItem.use_date] ?? 0) + 1;
    });

    searchAvailableEventsData.data.events.forEach((aEItem: any) => {
      // availableEvents[rItem.use_date] = 1;
      getDaysBetweenDates(moment(aEItem.start), moment(aEItem.end).subtract(1, 'days')).forEach(
        (date: any) => {
          availableEvents[`${date}-${aEItem.room_id}`] = 1;
        },
      );
    });

    bookRoomInfoData.forEach((item: any) => {
      getDaysBetweenDates(
        moment(item.use_start_date),
        moment(item.use_end_date).subtract(1, 'days'),
      ).forEach((date: any) => {
        validationNight[date] = (validationNight[date] ?? 0) + 1;
      });
    });

    let isError = false;

    Object.keys(validationNight).forEach((item: string) => {
      if (validationNight[item] > rateNumber[item]) {
        isError = true;
      }
    });

    bookRoomInfoData.forEach((item: any) => {
      getDaysBetweenDates(
        moment(item.use_start_date),
        moment(item.use_end_date).subtract(1, 'days'),
      ).forEach((date: any) => {
        if (availableEvents[`${date}-${item.room_id}`] === 1) {
          isError = true;
        }
      });
    });

    return isError;
  };

  const [bookRoomInfo, setBookRoomInfo] = useState<any>([]);

  const floors = reservationDetailInfo.resources
    .filter(function (item: any) {
      if (
        searchScheduleCondition.room_type &&
        item.room_type_id !== parseInt(searchScheduleCondition.room_type, 10)
      ) {
        return false;
      }

      return true;
    })
    .map((item: any) => {
      return item.floor;
    })
    .filter(onlyUnique);

  const views = reservationDetailInfo.resources
    .filter(function (item: any) {
      if (!item.view) {
        return false;
      }

      if (
        searchScheduleCondition.room_type &&
        item.room_type_id !== parseInt(searchScheduleCondition.room_type, 10)
      ) {
        return false;
      }

      return true;
    })
    .map((item: any) => {
      return item.view;
    })
    .filter(onlyUnique);

  const directions = reservationDetailInfo.resources
    .filter(function (item: any) {
      if (!item.direction) {
        return false;
      }

      if (
        searchScheduleCondition.room_type &&
        item.room_type_id !== parseInt(searchScheduleCondition.room_type, 10)
      ) {
        return false;
      }

      return true;
    })
    .map((item: any) => {
      return item.direction;
    })
    .filter(onlyUnique);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const bookRoomInfoTemporary = [...bookRoomInfo];

    bookRoomInfoTemporary.push({
      reservation_equipment_id: null,
      room_type: selectInfo.resource?.extendedProps.room_type_id,
      room_id: selectInfo.resource?.extendedProps.room_id,
      use_start_date: selectInfo.startStr,
      use_end_date: selectInfo.endStr,
      key: `${selectInfo.startStr}-${selectInfo.resource?._resource.id}`,
    });

    const isError = isValidSelectRoom(bookRoomInfoTemporary);

    const calendarApi = selectInfo.view.calendar;

    if (isError) {
      message.warn(t('message.Selecting room is invalid'));
    } else {
      calendarApi.addEvent({
        id: createEventId(),
        title: reservationDetailInfo.eventName,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        resourceId: selectInfo.resource?._resource.id,
        key: `${selectInfo.startStr}-${selectInfo.resource?._resource.id}`,
      });

      setBookRoomInfo(bookRoomInfoTemporary);
    }

    calendarApi.unselect(); // clear date selection
  };

  useEffect(() => {
    if (changed('status', 'SUCCESS')) {
      message.success(t('message.Booking room successfully!'));

      dispatch(
        getReservation({
          reservation_id: reservationId,
        }),
      );

      dispatch(
        getReservationDetail({
          reservation_id: reservationId,
          reservation_detail_id: reservationDetailId,
        }),
      );
    }
  }, [changed]);

  useEffect(() => {
    if (changedEvents('is_finish', true)) {
      // const calendarApi = fullCalendarRef.current.getApi().view.calendar;
      const stateTemporary: any = [];

      reservationDetailInfo.events.forEach((item: any) => {
        // calendarApi.addEvent({
        //   id: createEventId(),
        //   title: item.title,
        //   start: item.start,
        //   end: item.end,
        //   allDay: true,
        //   resourceId: item.room_id,
        //   room_id: item.room_id,
        //   room_type: item.room_type,
        //   reservation_equipment_id: item.reservation_equipment_id,
        //   key: `${item.start}-${item.room_id}`,
        // });

        stateTemporary.push({
          reservation_equipment_id: item.reservation_equipment_id,
          room_type: item.room_type,
          room_id: item.room_id,
          use_start_date: item.start,
          use_end_date: item.end,
          key: `${item.start}-${item.room_id}`,
        });
      });

      setBookRoomInfo(stateTemporary);
    }
  }, [changedEvents]);

  useEffect(() => {
    setSearchScheduleCondition({
      direction: '',
      end_date: reservationDetailInfo.checkout,
      floor: '',
      reservation_detail_id: reservationDetailInfo.id,
      room_type: roomTypeParam || reservationDetailInfo.room_type,
      start_date: reservationDetailInfo.checkin,
      view: '',
      isSmocking: undefined,
    });

    dispatch(
      searchAvailableScheduleAction({
        direction: '',
        end_date: reservationDetailInfo.checkout,
        floor: '',
        reservation_detail_id: reservationDetailInfo.id,
        room_type: '',
        start_date: reservationDetailInfo.checkin,
        view: '',
      }),
    );
  }, [reservationDetailInfo]);

  useEffect(() => {
    // Remove all current events
    // if (fullCalendarRef.current) {
    //   const calendarApi = fullCalendarRef.current.getApi().view.calendar;
    //   const events = calendarApi.getEvents();

    //   for (let i = 0; i < events.length; i++) {
    //     console.log('eventttt', events[i]);
    //     events[i].remove()
    //   }
    // }

    if (
      reservationDetailData.is_finish === true &&
      searchAvailableEventsData.is_searching === false
    ) {
      const calendarApi = fullCalendarRef.current.getApi().view.calendar;

      searchAvailableEventsData.data.events.forEach((item: any) => {
        calendarApi.addEvent({
          id: createEventId(),
          title: item.title,
          start: item.start,
          end: item.end,
          allDay: true,
          resourceId: item.room_id,
          reservationId: item.reservation_id,
          reservationDetailId: item.reservation_detail_id,
          room_id: item.room_id,
          room_type: item.room_type,
          reservation_equipment_id: item.reservation_equipment_id,
          disabled: true,
          key: `${item.start}-${item.room_id}`,
        });
      });

      reservationDetailInfo.events.forEach((item: any) => {
        calendarApi.addEvent({
          id: createEventId(),
          title: item.title,
          start: item.start,
          end: item.end,
          allDay: true,
          resourceId: item.room_id,
          room_id: item.room_id,
          room_type: item.room_type,
          reservation_equipment_id: item.reservation_equipment_id,
          key: `${item.start}-${item.room_id}`,
        });
      });
    }
  }, [searchAvailableEventsData.is_searching, reservationDetailData.is_finish]);

  const updateBookingRoom = () => {
    dispatch(
      bookRoom({
        payload: {
          rooms: bookRoomInfo,
          reservation_id: reservationId,
          reservation_detail_id: reservationDetailId,
        },
      }),
    );
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (clickInfo.event.extendedProps.disabled !== true) {
      if (
        window.confirm(
          `${t('message.Are you sure you want to delete the event')} '${clickInfo.event.title}'`,
        )
      ) {
        const bookRoomInfoTemporary = [...bookRoomInfo];

        const indexElement = bookRoomInfoTemporary.findIndex(function (item) {
          return (
            item.reservation_equipment_id === clickInfo.event.extendedProps.reservation_equipment_id
          );
        });

        bookRoomInfoTemporary.splice(indexElement, 1);

        clickInfo.event.remove();
        setBookRoomInfo(bookRoomInfoTemporary);
      }
    } else {
      window.open(
        `/reservation/${clickInfo.event.extendedProps.reservationId}?reservation_detail_id=${clickInfo.event.extendedProps.reservationDetailId}&tab=3&room_type=${clickInfo.event.extendedProps.room_type}`,
        '_blank',
      );
    }
  };

  const handleChangeEvent = (event: EventChangeArg) => {
    if (event.event.extendedProps.disabled === true) {
      event.revert();

      return;
    }

    const roomId = event.event?._def.resourceIds
      ? parseInt(event.event?._def.resourceIds[0], 10)
      : '';
    const selectedResource = reservationDetailInfo.resources.find((item: any) => {
      return item.room_id === roomId;
    });
    const bookRoomInfoTemporary = [...bookRoomInfo];
    const indexElement = bookRoomInfoTemporary.findIndex(function (item) {
      return item.key === event.oldEvent.extendedProps.key;
    });

    bookRoomInfoTemporary[indexElement] = {
      reservation_equipment_id: event.event?.extendedProps.reservation_equipment_id ?? null,
      room_type: selectedResource.room_type_id,
      room_id: roomId,
      use_start_date: event.event.startStr,
      use_end_date: event.event.endStr,
      key: `${event.event.startStr}-${roomId}`,
    };

    const isError = isValidSelectRoom(bookRoomInfoTemporary);

    if (isError) {
      message.warn(t('message.Selecting room is invalid'));
      event.revert();
    } else {
      setBookRoomInfo(bookRoomInfoTemporary);
      event.oldEvent.remove();

      const calendarApi = event.event._context.calendarApi.view.calendar;

      calendarApi.addEvent({
        id: createEventId(),
        title: reservationDetailInfo.eventName,
        start: event.event.startStr,
        end: event.event.endStr,
        allDay: true,
        resourceId: roomId.toString(),
        room_id: roomId,
        room_type: selectedResource.room_type_id,
        reservation_equipment_id: event.event.extendedProps.reservation_equipment_id,
        key: `${event.event.startStr}-${roomId}`,
      });
    }
  };

  const handleEvents = (events: EventApi[]) => {
    setState({
      ...state,
      currentEvents: events,
    });
  };

  const durationCheckinCheckout = moment.duration(
    moment(reservationDetailInfo.checkout).diff(moment(reservationDetailInfo.checkin)),
  );
  const checkInCheckOutDiffDays = durationCheckinCheckout.asDays();
  const scheduleDay = checkInCheckOutDiffDays < 7 ? 7 : checkInCheckOutDiffDays;

  // const resources = [
  //   { id: 'a', title: '102', occupancy: 'Superior', roomId: '1', roomType: '1' },
  //   { id: 'b', title: '103', occupancy: 'Superior', roomId: '2', roomType: '1' },
  //   { id: 'c', title: '104', occupancy: 'Superior', roomId: '3', roomType: '1' },
  //   { id: 'd', title: '105', occupancy: 'Superior', roomId: '4', roomType: '1' },
  //   { id: 'e', title: '106', occupancy: 'Deluxe', roomId: '5', roomType: '1' },
  //   { id: 'f', title: '107', occupancy: 'Deluxe', roomId: '6', roomType: '1' },
  //   { id: 'g', title: '108', occupancy: 'Deluxe', roomId: '7', roomType: '1' },
  //   { id: 'h', title: '109', occupancy: 'Deluxe', roomId: '8', roomType: '1' },
  //   { id: 'i', title: '110', occupancy: 'Deluxe', roomId: '9', roomType: '1' },
  //   { id: 'j', title: '111', occupancy: 'Deluxe', roomId: '10', roomType: '1' },
  //   { id: 'k', title: '112', occupancy: 'Family', roomId: '11', roomType: '1' },
  //   { id: 'l', title: '113', occupancy: 'Family', roomId: '12', roomType: '1' },
  //   { id: 'm', title: '114', occupancy: 'Family', roomId: '13', roomType: '1' },
  //   { id: 'n', title: '115', occupancy: 'Family', roomId: '14', roomType: '1' },
  //   { id: 'o', title: '116', occupancy: 'Family', roomId: '15', roomType: '1' },
  // ];
  const resources = reservationDetailInfo.resources.filter(function (item: any) {
    if (
      searchScheduleCondition.room_type &&
      item.room_type_id !== parseInt(searchScheduleCondition.room_type, 10)
    ) {
      return false;
    }

    if (searchScheduleCondition.isSmocking === true && item.is_smoking !== true) {
      return false;
    }

    if (
      searchScheduleCondition.floor &&
      item.floor !== parseInt(searchScheduleCondition.floor, 10)
    ) {
      return false;
    }

    if (searchScheduleCondition.view && item.view !== parseInt(searchScheduleCondition.view, 10)) {
      return false;
    }

    if (
      searchScheduleCondition.direction &&
      item.direction !== parseInt(searchScheduleCondition.direction, 10)
    ) {
      return false;
    }

    return true;
  });

  return (
    <Row style={{ paddingLeft: 15, backgroundColor: 'white', paddingTop: 15 }}>
      {reservationDetailData.is_finish === true &&
      searchAvailableEventsData.is_searching === false ? (
        <>
          <Col offset={16} span={8} style={{ marginTop: 15, marginBottom: 15, paddingRight: 15 }}>
            <Checkbox
              checked={searchScheduleCondition.isSmocking === true}
              onChange={value => {
                setSearchScheduleCondition({
                  ...searchScheduleCondition,
                  isSmocking: value.target.checked === true ? true : undefined,
                });
              }}
              style={{ paddingRight: 50 }}
            >
              Smoking Room
            </Checkbox>
            {user.permission.reservation.edit && (
              <PattonButton onClick={updateBookingRoom} style={{ float: 'right' }}>
                {t('common.Update')}
              </PattonButton>
            )}
          </Col>
          <Col span={8}>
            <Form.Item
              label={t('reservation.Checkin')}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker
                defaultValue={moment(reservationDetailData.data.checkin)}
                disabled
                style={{
                  height: 32,
                  borderRadius: 4,
                  marginRight: 11,
                  width: '100%',
                }}
              />
            </Form.Item>

            <Form.Item
              label={t('reservation.Checkout')}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker
                defaultValue={moment(reservationDetailData.data.checkout)}
                disabled
                style={{
                  height: 32,
                  borderRadius: 4,
                  marginRight: 11,
                  width: '100%',
                }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={t('reservation.Room Type.title')}>
              <Select
                allowClear
                defaultValue={searchScheduleCondition.room_type?.toString()}
                onChange={value => {
                  const searchScheduleConditionTemporary = {
                    ...searchScheduleCondition,
                    room_type: value === '' ? undefined : value,
                    floor: undefined,
                  };

                  setSearchScheduleCondition(searchScheduleConditionTemporary);
                }}
                placeholder={t('reservation.Room Type.placeholder')}
              >
                {_.keys(roomTypesData).map((key: any) => {
                  return (
                    <Option key={key} value={key}>
                      {roomTypesData[key]}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item label={t('reservation.Floor.title')}>
              <Select
                allowClear
                disabled={floors.length === 0}
                onChange={value => {
                  const searchScheduleConditionTemporary = {
                    ...searchScheduleCondition,
                    floor: value === '' ? undefined : value,
                  };

                  setSearchScheduleCondition(searchScheduleConditionTemporary);
                }}
                placeholder={t('reservation.Floor.placeholder')}
              >
                {floors.map((item: number) => {
                  return (
                    <Option key={item} value={item.toString()}>
                      {item}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={t('reservation.View.title')}>
              <Select
                allowClear
                disabled={views.length === 0}
                onChange={value => {
                  const searchScheduleConditionTemporary = {
                    ...searchScheduleCondition,
                    view: value === '' ? undefined : value,
                  };

                  setSearchScheduleCondition(searchScheduleConditionTemporary);
                }}
                placeholder={t('reservation.View.placeholder')}
              >
                {views.includes(1) && <Option value="1">{t('reservation.View.Sea View')}</Option>}
                {views.includes(2) && (
                  <Option value="1">{t('reservation.View.Mountain View')}</Option>
                )}
              </Select>
            </Form.Item>
            <Form.Item label={t('reservation.Direction.title')}>
              <Select
                allowClear
                disabled={directions.length === 0}
                onChange={value => {
                  const searchScheduleConditionTemporary = {
                    ...searchScheduleCondition,
                    direction: value === '' ? undefined : value,
                  };

                  setSearchScheduleCondition(searchScheduleConditionTemporary);
                }}
                placeholder={t('reservation.Direction.placeholder')}
              >
                {views.includes(1) && <Option value="1">{t('reservation.Direction.North')}</Option>}
                {views.includes(2) && <Option value="2">{t('reservation.Direction.East')}</Option>}
                {views.includes(3) && <Option value="3">{t('reservation.Direction.West')}</Option>}
                {views.includes(4) && <Option value="4">{t('reservation.Direction.South')}</Option>}
              </Select>
            </Form.Item>
          </Col>
          <Col className="schedule-tab" span={24}>
            <FullCalendar
              ref={fullCalendarRef}
              dayMaxEvents
              editable
              eventClassNames={event => {
                if (event.event.extendedProps.disabled) {
                  event.backgroundColor = '#8c8c8c';
                  event.borderColor = '#8c8c8c';
                  event.isSelected = false;
                  event.isDraggable = false;
                }

                return '';
              }}
              eventClick={handleEventClick}
              eventContent={renderEventContent}
              eventDrop={handleChangeEvent}
              eventResize={handleChangeEvent}
              // events={`${process.env.REACT_APP_API_HOST}/events`}
              eventsSet={handleEvents}
              headerToolbar={{
                // left: 'today,prev,next',
                left: '',
                center: 'title',
                right: '',
              }}
              initialDate={reservationDetailInfo.checkin}
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
                  headerContent: t('reservation.Room Type.title'),
                },
              ]}
              resources={resources}
              select={handleDateSelect} // alternatively, use the `events` setting to fetch from a feed
              selectConstraint={{
                start: moment(reservationDetailInfo.checkin).format('YYYY-MM-DD'),
                end: moment(reservationDetailInfo.checkout).format('YYYY-MM-DD'),
              }}
              selectMirror
              selectable
              titleFormat={{
                month: 'short',
                year: 'numeric',
                day: 'numeric',
              }}
              viewClassNames="calendar-table"
              views={{
                timeGridMonthly: {
                  type: 'resourceTimelineMonth',
                  duration: { days: 15 },
                  slotDuration: { days: 1 },
                  slotLabelFormat(argument) {
                    return moment(argument.date).format('DD[\n]dd');
                  },
                  slotLaneContent(argument) {
                    const days = [];

                    for (let index = 0; index < resources.length; index++) {
                      days.push(moment(argument.date).format('DD'));
                    }

                    return days.join('\n');
                  },
                  slotLaneClassNames: 'slot-fc-day-monthly',
                  buttonText: t('common.Monthly'),
                  validRange: {
                    start: moment(reservationDetailInfo.checkin).format('YYYY-MM-DD'),
                    end: moment(reservationDetailInfo.checkout).format('YYYY-MM-DD'),
                  },
                },
                timeGridWeekly: {
                  type: 'resourceTimelineWeek',
                  duration: { days: scheduleDay },
                  slotDuration: { days: 1 },
                  slotLabelFormat(argument) {
                    return moment(argument.date).format('DD[\n]dd');
                  },
                  slotLaneContent(argument) {
                    const days = [];

                    for (let index = 0; index < resources.length; index++) {
                      days.push(moment(argument.date).format('DD'));
                    }

                    return days.join('\n');
                  },
                  slotLaneClassNames(hookProps) {
                    const slotDate = hookProps.date;

                    if (moment(slotDate) >= moment(reservationDetailInfo.checkout)) {
                      return 'slot-fc-day-weekly disabled';
                    }

                    return 'slot-fc-day-weekly';
                  },
                  slotLabelClassNames(hookProps) {
                    const slotDate = hookProps.date;

                    if (moment(slotDate) >= moment().add(1, 'days')) {
                      return 'weekly disabled';
                    }

                    return 'weekly';
                  },
                  // slotLaneClassNames: 'slot-fc-day-weekly',
                  // slotLabelClassNames: 'monthly',
                  buttonText: t('common.Weekly'),
                  validRange: {
                    start: moment(reservationDetailInfo.checkin).format('YYYY-MM-DD'),
                    end: moment(reservationDetailInfo.checkout).format('YYYY-MM-DD'),
                  },
                },
              }}
              weekends // called after events are initialized/added/changed/removed
              /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
            />
          </Col>
        </>
      ) : null}
    </Row>
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

export default Schedule;
