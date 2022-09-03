import { EventInput } from '@fullcalendar/react';

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
