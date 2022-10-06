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
import FullCalendar, { EventApi, EventContentArg } from '@fullcalendar/react';
import { Col, DatePicker, Row, Select } from 'antd';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import {
  createEventId,
  INITIAL_EVENTS,
} from 'pages/reservation/component/ReservationDetailTab/event-utils';
import MInput from 'components/MInput';
import { searchScheduleAction } from 'actions';
import { selectSearchSchedule } from 'selectors';
import { useAppSelector } from 'modules/hooks';
import useTreeChanges from 'tree-changes-hook';

interface DemoAppState {
  currentEvents: EventApi[];
  weekendsVisible: boolean;
}

const { Option } = Select;

function Calendar() {
  const dispatch = useDispatch();
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

  const toggleShowDatePicker = () => {
    setIsShowDatePicker(!isShowDatePicker);
  };

  const searchScheduleRedux: any = useAppSelector(selectSearchSchedule);
  const { changed } = useTreeChanges(searchScheduleRedux);

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
        });
      });
    }
  }, [changed]);

  return (
    <>
      <Row style={{ background: 'white', padding: 16 }}>
        <Col span={24}>
          <span> Filter </span>
          <Select
            onChange={value =>
              setSearchCondition({
                ...searchCondition,
                room_type: value,
              })
            }
            placeholder="Room Type"
            style={{
              width: 150,
              marginLeft: 15,
            }}
          >
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
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
            placeholder="Room Number"
            style={{
              width: 150,
              marginLeft: 15,
            }}
          />
          <div style={{ float: 'right', paddingTop: 5 }}>
            <span style={{ marginRight: 165 }}>Display</span>
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
              eventContent={renderEventContent}
              eventsSet={handleEvents}
              headerToolbar={{
                left: '',
                right: 'timeGridWeekly,timeGridMonthly',
              }}
              initialDate={searchCondition.start_date}
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
                  duration: { days: 15 },
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
                  buttonText: 'Weekly',
                },
              }}
              weekends
            />
          ) : null}
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
