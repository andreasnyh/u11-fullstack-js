import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick

const handleDateSelect = (selectInfo) => {
  const title = prompt('Please enter a new title for your event');
  const calendarApi = selectInfo.view.calendar;
  console.log(calendarApi.addEvent);
  calendarApi.unselect(); // clear date selection
  console.log(selectInfo);

  if (title) {
    calendarApi.addEvent({
      id: Date.now(),
      title,
      start: selectInfo.dateStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay
    });
  }
  console.log(calendarApi);
};

const handleEventClick = (clickInfo) => {
  if (
    // eslint-disable-next-line no-alert
    // eslint-disable-next-line no-restricted-globals
    confirm(
      `Are you sure you want to delete the event '${clickInfo.event.title}'`
    )
  ) {
    clickInfo.event.remove();
  }
};

const handleEvents = (events) => {
  console.log(events);
};

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

const Calendar = () => {
  return (
    <FullCalendar
      /*       locale="sv"
      weekends
      plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
      initialView="dayGridWeek"
      // initialView="timeGridWeek"
      dateClick={handleDateClick} */
      firstDay="1"
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        start: 'title',
        center: 'dayGridMonth,timeGridWeek,timeGridDay',
        end: 'prev,next today'
      }}
      initialView="dayGridMonth"
      editable
      selectable
      selectMirror
      dayMaxEvents
      weekends
      contentHeight="auto"
      locale={document.querySelector('html').getAttribute('lang')}
      // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
      dateClick={handleDateSelect}
      eventContent={renderEventContent} // custom render function
      eventClick={handleEventClick}
      eventsSet={handleEvents} // called after events are initialized/added/changed/removed
      /* you can update a remote database when these fire:
      eventAdd={function(){}}
      eventChange={function(){}}
      eventRemove={function(){}}
      */
    />
  );
};

export default Calendar;
