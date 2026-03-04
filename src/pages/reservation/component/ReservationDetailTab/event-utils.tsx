/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 15/09/2022
Updated Date : 15/09/2022
Main functions : Event Utils
************************************ */

import { EventInput } from '@fullcalendar/core';

let eventGuid = 0;
const todayString = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayString,
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: `${todayString}T12:00:00`,
  },
];

export function createEventId() {
  return String(eventGuid++);
}
