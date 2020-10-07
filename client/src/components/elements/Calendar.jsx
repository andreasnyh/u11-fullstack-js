import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick

const handleDateClick = (arg) => {
  // bind with an arrow function
  console.log(arg.dateStr);
};

const Calendar = () => {
  return (
    <FullCalendar
      locale="sv"
      firstDay="1"
      plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
      // initialView="dayGridMonth"
      initialView="timeGridWeek"
      dateClick={handleDateClick}
    />
  );
};

export default Calendar;
