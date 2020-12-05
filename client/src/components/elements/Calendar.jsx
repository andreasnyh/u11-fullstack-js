import React, { Component } from 'react';
import Modal from 'react-modal';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import moment from 'moment';
import { Colors } from '../../config/ColorsShadows';

import { Button, CloseModalButton, Form, Input, Label } from '.';
import { eventService } from '../../services';

Modal.setAppElement('#root');

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDay: false,
      events: [],
      modalIsOpen: false,
      title: '',
      selectInfo: null,
      date: null,
      startTime: null,
      endTime: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAllDayChange = this.handleAllDayChange.bind(this);
    // this.handleEvents = this.handleEvents.bind(this);
    this.handleEventClick = this.handleEventClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    const { roomId } = this.props;
    eventService.getRoomEvents(roomId).then((events) => {
      this.setState({ events });
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleAllDayChange() {
    this.setState((prevState) => ({
      allDay: !prevState.allDay
    }));
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      allDay,
      title,
      selectInfo,
      // startDate,
      startTime,
      // endDate,
      endTime
    } = this.state;
    const { roomId, userId } = this.props;
    const calendarApi = selectInfo.view.calendar;
    let newEndTime = null;
    let newStartTime = null;
    calendarApi.unselect(); // clear date selection

    if (!selectInfo.view.type === 'timeGridWeek') {
      const startArr = startTime.split(':');
      const endArr = endTime.split(':');
      newStartTime =
        selectInfo.start &&
        moment(selectInfo.start.setUTCHours(startArr[0], startArr[1]));
      newEndTime =
        selectInfo.end &&
        moment(selectInfo.end.setUTCHours(endArr[0], endArr[1]));
    }

    const newEvent = {
      allDay,
      title,
      start: newStartTime || selectInfo.date,
      end: newEndTime || selectInfo.date,
      room: roomId,
      user: userId
    };
    calendarApi.addEvent(newEvent);
    eventService.create(newEvent);

    this.setState({
      allDay: false,
      modalIsOpen: false,
      title: '',
      selectInfo: null,
      date: null,
      startTime: null,
      endTime: null
    });
  }

  /* afterOpenModal() {
    // references are now synced and can be accessed.
    // subtitle.style.color = '#f00';
  } */

  closeModal() {
    this.setState({
      modalIsOpen: false,
      selectInfo: null,
      date: null,
      startTime: null,
      endTime: null
    });
  }

  handleDateSelect(selectInfo) {
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection

    this.setState({
      allDay: selectInfo.view.type === 'dayGridMonth',
      // || selectInfo.start === selectInfo.end,
      modalIsOpen: true,
      selectInfo,
      date: selectInfo.date,
      // startDate: selectInfo.start,
      startTime: selectInfo.start && moment(selectInfo.start).format('HH:mm'),
      // endDate: selectInfo.end,
      endTime: selectInfo.end && moment(selectInfo.end).format('HH:mm')
    });
  }

  // eslint-disable-next-line class-methods-use-this
  handleEventClick(clickInfo) {
    const { userId } = this.props;
    if (
      userId === clickInfo.event.user &&
      /* eslint-disable no-restricted-globals, no-alert */
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
    /* eslint-enable no-restricted-globals, no-alert */
  }

  /*  handleEvents(events) {
    this.setState({
      currentEvents: events
    });
  } */

  // eslint-disable-next-line class-methods-use-this
  renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <br />
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  renderModal() {
    const {
      allDay,
      modalIsOpen,
      title,
      selectInfo,
      date,
      startTime,
      endTime
    } = this.state;

    const { roomName } = this.props;

    const customStyles = {
      content: {
        top: '50%',
        right: '10%',
        bottom: 'auto',
        left: '50%',
        marginRight: '-50%',
        backgroundColor: `${Colors.Light}`,
        transform: 'translate(-50%, -50%)',
        zIndex: 10
      },
      overlay: {
        zIndex: 999999999999
      }
    };

    return (
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>{`Boka ${roomName}`}</h2>
        <h3>{moment(selectInfo.dateStr).format('MMMM DD YYYY')}</h3>

        <Form handleSubmit={this.handleSubmit}>
          <Label>
            All day event
            <Input
              name="allDay"
              type="checkbox"
              checked={allDay}
              onChange={this.handleAllDayChange}
            />
          </Label>
          <Label>
            Title
            <Input
              required
              type="text"
              name="title"
              value={title || ''}
              placeholder="Event title"
              onChange={this.handleChange}
            />
          </Label>
          <Label>
            Start Time
            <Input
              name="startTime"
              type="time"
              value={startTime || moment(date).format('HH:mm')}
              disabled={allDay}
              onChange={this.handleChange}
            />
          </Label>
          <Label>
            End Time
            <Input
              name="endTime"
              type="time"
              value={endTime || moment(date).add('00:30').format('HH:mm')}
              disabled={allDay}
              onChange={this.handleChange}
            />
          </Label>
          <Button confirm type="submit">
            Submit
          </Button>
        </Form>
        <CloseModalButton type="button" onClick={() => this.closeModal()}>
          X
        </CloseModalButton>
      </Modal>
    );
  }

  render() {
    const { events, modalIsOpen } = this.state;

    const businessHours = {
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
      startTime: '08:00',
      endTime: '21:00'
    };

    return (
      <>
        <FullCalendar
          firstDay="1"
          businessHours={businessHours}
          slotMinTime="07:00"
          slotMaxTime="22:00"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            start: 'title',
            center: 'dayGridMonth,timeGridWeek,timeGridDay',
            end: 'prev,next today'
          }}
          initialView="timeGridWeek"
          editable
          selectable
          selectMirror
          dayMaxEvents
          weekends
          contentHeight="auto"
          locale={document.querySelector('html').getAttribute('lang')}
          dateClick={this.handleDateSelect} // clicking an empty space in the calendar
          select={this.handleDateSelect} // when drag selecting an event
          events={events}
          eventContent={this.renderEventContent} // custom render function
          eventClick={this.handleEventClick}
          eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
          selectConstraint={businessHours}
          eventConstraint={businessHours}
          /*
    // you can update a remote database when these fire:
    eventAdd={function(){}}
    eventRemove={function(){}}
    eventChange={function(){}}
    */
        />
        {modalIsOpen ? this.renderModal() : null}
      </>
    );
  }
}
