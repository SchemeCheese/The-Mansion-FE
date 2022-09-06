/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 03/09/2022
Updated Date : 04/09/2022
Main functions : Calendar Tab
************************************ */

/* eslint simple-import-sort/imports: 0 */
import React, { useState } from 'react';
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
import { Col, Row } from 'antd';
import moment from 'moment';

import PattonButton from 'components/PattonButton';
import MButton from 'components/MButton';
import { createEventId, INITIAL_EVENTS } from './event-utils';

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
            events="http://localhost:8096/events"
            eventsSet={handleEvents}
            headerToolbar={{
              left: 'today,prev,next',
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
            resources={[
              { id: 'a', title: '102', occupancy: 'Superior' },
              { id: 'b', title: '103', occupancy: 'Superior' },
              { id: 'c', title: '104', occupancy: 'Superior' },
              { id: 'd', title: '105', occupancy: 'Superior' },
              { id: 'e', title: '106', occupancy: 'Deluxe' },
              { id: 'f', title: '107', occupancy: 'Deluxe' },
              { id: 'g', title: '108', occupancy: 'Deluxe' },
              { id: 'h', title: '109', occupancy: 'Deluxe' },
              { id: 'i', title: '110', occupancy: 'Deluxe' },
              { id: 'j', title: '111', occupancy: 'Deluxe' },
              { id: 'k', title: '112', occupancy: 'Family' },
              { id: 'l', title: '113', occupancy: 'Family' },
              { id: 'm', title: '114', occupancy: 'Family' },
              { id: 'n', title: '115', occupancy: 'Family' },
              { id: 'o', title: '116', occupancy: 'Family' },
            ]}
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

                  return days.join(' ');
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

                  return days.join(' ');
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
