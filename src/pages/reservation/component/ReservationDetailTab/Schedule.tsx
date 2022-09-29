/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 03/09/2022
Updated Date : 18/09/2022
Main functions : Schedule Tab
************************************ */

/* Demo: https://github.com/fullcalendar/fullcalendar-example-projects/tree/master/react-typescript */
/* eslint simple-import-sort/imports: 0 */
/* eslint no-underscore-dangle: 0 */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FullCalendar, {
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventContentArg,
} from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Checkbox, Col, DatePicker, Form, Row, Select } from 'antd';
import moment from 'moment';

import PattonButton from 'components/PattonButton';

import {
  createEventId,
  INITIAL_EVENTS,
} from 'pages/reservation/component/ReservationDetailTab/event-utils';

interface DemoAppState {
  currentEvents: EventApi[];
  weekendsVisible: boolean;
}

const { Option } = Select;

function Schedule() {
  const [state, setState] = useState<DemoAppState>({
    weekendsVisible: true,
    currentEvents: [],
  });
  const { t } = useTranslation();

  const [bookRoomInfo, setBookRoomInfo] = useState<any>([]);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    calendarApi.addEvent({
      id: createEventId(),
      title: 'Minh NV - Agoda',
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
      resourceId: selectInfo.resource?._resource.id,
    });

    const bookRoomInfoTemporary = [...bookRoomInfo];

    bookRoomInfoTemporary.push({
      reservation_equipment_id: null,
      room_type: selectInfo.resource?.extendedProps.roomType,
      room_id: selectInfo.resource?.extendedProps.roomId,
      use_start_date: selectInfo.startStr,
      use_end_date: selectInfo.endStr,
    });

    setBookRoomInfo(bookRoomInfoTemporary);
  };

  console.log('Schedule setBookRoomInfo', bookRoomInfo);

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events: EventApi[]) => {
    setState({
      ...state,
      currentEvents: events,
    });
  };

  const resources = [
    { id: 'a', title: '102', occupancy: 'Superior', roomId: '1', roomType: '1' },
    { id: 'b', title: '103', occupancy: 'Superior', roomId: '2', roomType: '1' },
    { id: 'c', title: '104', occupancy: 'Superior', roomId: '3', roomType: '1' },
    { id: 'd', title: '105', occupancy: 'Superior', roomId: '4', roomType: '1' },
    { id: 'e', title: '106', occupancy: 'Deluxe', roomId: '5', roomType: '1' },
    { id: 'f', title: '107', occupancy: 'Deluxe', roomId: '6', roomType: '1' },
    { id: 'g', title: '108', occupancy: 'Deluxe', roomId: '7', roomType: '1' },
    { id: 'h', title: '109', occupancy: 'Deluxe', roomId: '8', roomType: '1' },
    { id: 'i', title: '110', occupancy: 'Deluxe', roomId: '9', roomType: '1' },
    { id: 'j', title: '111', occupancy: 'Deluxe', roomId: '10', roomType: '1' },
    { id: 'k', title: '112', occupancy: 'Family', roomId: '11', roomType: '1' },
    { id: 'l', title: '113', occupancy: 'Family', roomId: '12', roomType: '1' },
    { id: 'm', title: '114', occupancy: 'Family', roomId: '13', roomType: '1' },
    { id: 'n', title: '115', occupancy: 'Family', roomId: '14', roomType: '1' },
    { id: 'o', title: '116', occupancy: 'Family', roomId: '15', roomType: '1' },
  ];

  return (
    <Row style={{ paddingLeft: 15, backgroundColor: 'white', paddingTop: 15 }}>
      <Col offset={16} span={8} style={{ marginTop: 15, marginBottom: 15, paddingRight: 15 }}>
        <Checkbox style={{ paddingRight: 50 }}>Smoking Room</Checkbox>
        <PattonButton style={{ float: 'right' }}>{t('common.Update')}</PattonButton>
      </Col>
      <Col span={8}>
        <Form.Item
          label={t('reservation.Checkin')}
          name="checkin"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker
            defaultValue={moment('2017-08-08')}
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
          name="checkout"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker
            defaultValue={moment('2017-08-08')}
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
        <Form.Item
          label={t('reservation.Room Type.title')}
          name="room_type"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select allowClear placeholder={t('reservation.Room Type.placeholder')}>
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Floor"
          name="room_type"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select allowClear placeholder="Select floor">
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          label="View"
          name="room_type"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select allowClear placeholder="Select view">
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Direction"
          name="room_type"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select allowClear placeholder="Select direction">
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={24}>
        <FullCalendar
          dayMaxEvents
          editable
          eventClick={handleEventClick}
          eventContent={renderEventContent}
          events={`${process.env.REACT_APP_API_HOST}/events`}
          eventsSet={handleEvents}
          headerToolbar={{
            // left: 'today,prev,next',
            left: '',
            center: 'title',
            right: '',
          }}
          initialEvents={INITIAL_EVENTS}
          initialView="timeGridWeekly"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimelinePlugin]}
          resourceAreaColumns={[
            {
              field: 'title',
              headerContent: 'Room No',
            },
            {
              field: 'occupancy',
              headerContent: 'Room Type',
            },
          ]}
          resources={resources}
          select={handleDateSelect}
          selectConstraint={{
            start: moment().format('YYYY-MM-DD'),
            end: moment().add(2, 'days').format('YYYY-MM-DD'),
          }} // alternatively, use the `events` setting to fetch from a feed
          selectMirror
          selectable
          titleFormat={{
            month: 'short',
            year: 'numeric',
            day: 'numeric',
          }}
          // initialDate={'2022-10-01'}
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

                for (let index = 0; index < 15; index++) {
                  days.push(moment(argument.date).format('DD'));
                }

                return days.join('\n');
              },
              slotLaneClassNames: 'slot-fc-day-monthly',
              buttonText: 'Monthly',
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

                for (let index = 0; index < 15; index++) {
                  days.push(moment(argument.date).format('DD'));
                }

                return days.join('\n');
              },
              slotLaneClassNames(hookProps) {
                console.log('hookProps', hookProps);
                const slotDate = hookProps.date;

                if (moment(slotDate) >= moment().add(1, 'days')) {
                  return 'slot-fc-day-weekly disabled';
                }

                return 'slot-fc-day-weekly';
              },
              slotLabelClassNames(hookProps) {
                console.log('hookProps', hookProps);
                const slotDate = hookProps.date;

                if (moment(slotDate) >= moment().add(1, 'days')) {
                  return 'weekly disabled';
                }

                return 'weekly';
              },
              // slotLaneClassNames: 'slot-fc-day-weekly',
              // slotLabelClassNames: 'monthly',
              buttonText: 'Weekly',
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
