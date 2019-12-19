import * as dates from 'react-big-calendar/lib/utils/dates';
import { DateLocalizer } from 'react-big-calendar/lib/localizer';

const dateRangeFormat = ({ start, end }, culture, local) =>
  local.format(start, { dateStyle: 'medium' }, culture) +
  ' – ' +
  local.format(end, { dateStyle: 'medium' }, culture);

const timeRangeFormat = ({ start, end }, culture, local) =>
  local.format(start, { timeStyle: 'short' }, culture) +
  ' – ' +
  local.format(end, { timeStyle: 'short' }, culture);

const timeRangeStartFormat = ({ start }, culture, local) =>
  local.format(start, { timeStyle: 'short' }, culture) + ' – '

const timeRangeEndFormat = ({ end }, culture, local) => 
  ' – ' + local.format(end, { timeStyle: 'short' }, culture);

const weekRangeFormat = ({ start, end }, culture, local) => {
  const startFormat = {month: 'short', day: '2-digit'}
  const endFormat = dates.eq(start, end, 'month') ? {day: '2-digit'} : startFormat;

  return `${local.format(start, startFormat, culture)} – ${local.format(end, endFormat, culture)}`;
};
  

export const formats = {
  dateFormat: {
    day: '2-digit'
  },
  dayFormat: {
    weekday: 'short',
    month: 'short',
    day: '2-digit'
  },
  weekdayFormat: {
    weekday: 'short'
  },
  selectRangeFormat: timeRangeFormat,
  eventTimeRangeFormat: timeRangeFormat,
  eventTimeRangeStartFormat: timeRangeStartFormat,
  eventTimeRangeEndFormat: timeRangeEndFormat,
  timeGutterFormat: { 
    timeStyle: 'short'
  },
  monthHeaderFormat: {
    month: 'long',
    year: 'numeric'
  },
  dayHeaderFormat: {
    weekday: 'long',
    month: 'short',
    day: '2-digit'
  },
  dayRangeHeaderFormat: weekRangeFormat,
  agendaHeaderFormat: dateRangeFormat,
  agendaDateFormat: {
    weekday: 'short',
    month: 'short',
    day: '2-digit'
  },
  agendaTimeFormat: { 
    timeStyle: 'short' 
  },
  agendaTimeRangeFormat: timeRangeFormat,
}

export default function(intl) {
  let locale = intl;

  // return the first day of the week from the locale data. Defaults to 'world'
  // territory if no territory is derivable from CLDR.
  // Failing to use CLDR supplemental (not loaded?), revert to the original
  // method of getting first day of week.
  function firstOfWeek(culture) {
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    return days.indexOf('mon');
  }

  return new DateLocalizer({
    firstOfWeek,
    formats,
    format(value, format, culture) {
      if(format.timeStyle) {
        return locale.formatTime(value, format);
      } else {
        return locale.formatDate(value, format);
      }
    },
  })
}