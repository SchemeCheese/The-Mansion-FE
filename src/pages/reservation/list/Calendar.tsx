/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 03/09/2022
Updated Date : 04/09/2022
Main functions : Calendar Tab
************************************ */

/* Demo: https://github.com/fullcalendar/fullcalendar-example-projects/tree/master/react-typescript */
/* eslint simple-import-sort/imports: 0 */
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import React, { useState } from 'react';
import FullCalendar, {
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventContentArg,
} from '@fullcalendar/react';
import { Col, Row } from 'antd';
import moment from 'moment';

import PattonButton from 'components/PattonButton';
import MButton from 'components/MButton';
import {
  createEventId,
  INITIAL_EVENTS,
} from 'pages/reservation/component/ReservationDetailTab/event-utils';

interface DemoAppState {
  currentEvents: EventApi[];
  weekendsVisible: boolean;
}

function Calendar() {
  const [state, setState] = useState<DemoAppState>({
    weekendsVisible: true,
    currentEvents: [],
  });

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

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

  return (
    <>
      <Row style={{ background: 'white', padding: 16 }}>
        <Col span={24}>
          <PattonButton style={{ marginRight: 15 }}>Empty Room</PattonButton>
          <MButton>Booked Room</MButton>
          <div style={{ float: 'right', paddingTop: 5 }}>
            <span style={{ marginRight: 165 }}>Display</span>
          </div>
        </Col>
      </Row>
      <Row style={{ background: 'white', padding: 16, marginTop: 20 }}>
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
              right: 'timeGridWeekly,timeGridMonthly',
            }}
            initialEvents={INITIAL_EVENTS}
            initialView="timeGridMonthly"
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
            resources={`${process.env.REACT_APP_API_HOST}/resources`}
            select={handleDateSelect}
            selectMirror // alternatively, use the `events` setting to fetch from a feed
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
                slotLaneClassNames: 'slot-fc-day-weekly',
                slotLabelClassNames: 'monthly',
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
