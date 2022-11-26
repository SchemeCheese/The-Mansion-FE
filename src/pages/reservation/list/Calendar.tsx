/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 03/09/2022
Updated Date : 04/09/2022
Main functions : Calendar Tab
************************************ */

/* Demo: https://github.com/fullcalendar/fullcalendar-example-projects/tree/master/react-typescript */
/* eslint simple-import-sort/imports: 0 */
/* eslint no-underscore-dangle: 0 */

import 'styles/calendar.css';

import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import React, { useState, useEffect } from 'react';
import FullCalendar, { EventApi, EventClickArg, EventContentArg } from '@fullcalendar/react';
import { Button, Card, Col, DatePicker, Input, message, Modal, Row, Select } from 'antd';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  createEventId,
  INITIAL_EVENTS,
} from 'pages/reservation/component/ReservationDetailTab/event-utils';
import MInput from 'components/MInput';
import { searchScheduleAction, updateNoteReservationDetail } from 'actions';
import { selectSearchSchedule, selectUpdateNoteReservationDetail } from 'selectors';
import { useAppSelector } from 'modules/hooks';
import useTreeChanges from 'tree-changes-hook';
import { useTranslation } from 'react-i18next';

interface DemoAppState {
  currentEvents: EventApi[];
  weekendsVisible: boolean;
}

const { Option } = Select;

function Calendar() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState<DemoAppState>({
    weekendsVisible: true,
    currentEvents: [],
  });
  const [searchCondition, setSearchCondition] = useState({
    start_date: moment().format('YYYY-MM-DD'),
    end_date: moment().add(15, 'days').format('YYYY-MM-DD'),
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
  const { changed } = useTreeChanges(searchScheduleRedux);
  const { changed: changedNote } = useTreeChanges(updateNoteReservationDetailData);

  const fullCalendarRef: any = React.createRef();

  const handleEvents = (events: EventApi[]) => {
    setState({
      ...state,
      currentEvents: events,
    });
  };

  const handleChangePickDate = (date: any) => {
    const temporaryState = {
      ...searchCondition,
      start_date: date.format('YYYY-MM-DD'),
      end_date: date.add(15, 'days').format('YYYY-MM-DD'),
    };

    setSearchCondition(temporaryState);
    setIsShowDatePicker(false);
    dispatch(searchScheduleAction(temporaryState));
  };

  const [resources, setResources] = useState([]);

  useEffect(() => {
    dispatch(searchScheduleAction(searchCondition));
  }, []);

  useEffect(() => {
    setResources(searchScheduleRedux.data.resources);

    if (changed('is_searching', false)) {
      const calendarApi = fullCalendarRef.current.getApi().view.calendar;

      searchScheduleRedux.data.events.forEach((item: any) => {
        calendarApi.addEvent({
          id: createEventId(),
          title: item.title,
          start: item.start,
          end: item.end,
          allDay: true,
          resourceId: item.resourceId,
          reservationDetailId: item.reservationDetailId,
          reservationInfoId: item.reservationInfoId,
          note: item.note,
          folioId: item.folioId,
        });
      });
    }
  }, [changed]);

  useEffect(() => {
    if (changedNote('status', 'SUCCESS')) {
      message.success(t('message.Update note successfully!'));
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
    const reservation = clickInfo.event.extendedProps;

    setInfoReservationSelected({
      reservation_detail_id: reservation.reservationDetailId,
      reservation_info_id: reservation.reservationInfoId,
      title: clickInfo.event.title,
      note: reservation.note,
      folio_id: reservation.folioId,
    });

    setIsEventInfoModalOpen(true);
  };

  const handleChangeNote = (event: any) => {
    setInfoReservationSelected({
      ...infoReservationSelected,
      note: event.target.value,
    });
  };

  return (
    <>
      <Row style={{ background: 'white', padding: 16 }}>
        <Col span={24}>
          <span> {t('common.Filter')} </span>
          <Select
            allowClear
            onChange={value => {
              const searchConditionStateTemporary = {
                ...searchCondition,
                room_type: value ?? '',
              };

              setSearchCondition(searchConditionStateTemporary);
              dispatch(searchScheduleAction(searchConditionStateTemporary));
            }}
            placeholder={t('common.Room Type')}
            style={{
              width: 150,
              marginLeft: 15,
            }}
          >
            <Option value="1">Premium Alex</Option>
            <Option value="2">Superior Double</Option>
            <Option value="3">Deluxe with Balcony</Option>
            <Option value="4">Studio Twin</Option>
            <Option value="5">Studio Double</Option>
            <Option value="6">Royal Family</Option>
          </Select>
          <MInput
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
            style={{
              width: 150,
              marginLeft: 15,
            }}
          />
          <div style={{ float: 'right', paddingTop: 5 }}>
            <span style={{ marginRight: 165 }}>{t('common.Display')}</span>
          </div>
        </Col>
      </Row>
      <Row style={{ background: 'white', padding: 16, marginTop: 20 }}>
        <Col className="schedule-calendar" span={24} style={{ textAlign: 'center' }}>
          <b
            aria-hidden="true"
            className="title-date"
            onClick={toggleShowDatePicker}
            role="button"
            tabIndex={0}
          >
            {moment(searchCondition.start_date).format('MMMM Y')}
          </b>
          <DatePicker
            allowClear={false}
            dateRender={current => {
              const style: React.CSSProperties = {};

              if (current.day() === 0 || current.day() === 6) {
                style.color = 'red';
              }

              return (
                <div className="ant-picker-cell-inner" style={style}>
                  {current.date()}
                </div>
              );
            }}
            defaultValue={moment()}
            format="MMMM Y"
            onChange={date => handleChangePickDate(date)}
            open={isShowDatePicker}
          />
          {searchScheduleRedux.is_searching === false ? (
            <FullCalendar
              ref={fullCalendarRef}
              eventClick={showEventInfo}
              eventContent={renderEventContent}
              eventsSet={handleEvents}
              headerToolbar={{
                left: 'prev,next',
                right: 'timeGridWeekly,timeGridMonthly',
              }}
              initialDate={searchCondition.start_date}
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
                    const days = [];

                    for (
                      let index = 0;
                      index < searchScheduleRedux.data.resources.length ?? 0;
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
                    const days = [];

                    for (
                      let index = 0;
                      index < searchScheduleRedux.data.resources.length ?? 0;
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
        title={
          <Row>
            <Col className="gutter-row" span={12}>
              <b>{t('common.Notes')}</b>
            </Col>
            <Col className="gutter-row" span={12}>
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
        visible={isEventInfoModalOpen}
        width={644}
      >
        <Card
          className="card-calendar-notes"
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
