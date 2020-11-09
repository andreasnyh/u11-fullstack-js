import React, { Component } from 'react';
import Modal from 'react-modal';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
// import moment from 'moment';
import { Colors } from '../../config/ColorsShadows';
// eslint-disable-next-line import/no-cycle
import { Form, Input, Label } from '.';
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
      selectInfo: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAllDayChange = this.handleAllDayChange.bind(this);
    this.handleEvents = this.handleEvents.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    eventService.getAll().then((events) => {
      // console.log('fetch', events);
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
    const { allDay, title, selectInfo /* , startTime, endTime */ } = this.state;
    const calendarApi = selectInfo.view.calendar;
    console.log('handleSubmit Calendar', this.state);
    calendarApi.unselect(); // clear date selection

    console.log(selectInfo);
    // console.log(moment(this.state.startTime).format('LT'));

    const newEvent = {
      allDay,
      title,
      start: selectInfo.dateStr,
      end: selectInfo.endStr || selectInfo.dateStr
      // startTime: startTime.format('LT'),
      // endTime
    };
    calendarApi.addEvent(newEvent);
    eventService.create(newEvent);

    this.setState({ modalIsOpen: false, title: '', selectInfo: null });
  }

  /* afterOpenModal() {
    // references are now synced and can be accessed.
    // subtitle.style.color = '#f00';
  } */

  closeModal() {
    this.setState({ modalIsOpen: false, selectInfo: null });
  }

  handleDateSelect(selectInfo) {
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    console.log('open MOdal');
    this.setState({ modalIsOpen: true, selectInfo });
    // console.log(calendarApi);

    /*     if (title) {
          calendarApi.addEvent({
            id: Date.now(),
            title,
            start: selectInfo.dateStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay
          });
        } */
  }

  // eslint-disable-next-line class-methods-use-this
  handleEventClick(clickInfo) {
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events) {
    console.log('handleEvents', events);
    this.setState({
      currentEvents: events
    });
  }

  // eslint-disable-next-line class-methods-use-this
  renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  renderModal() {
    const { allDay, modalIsOpen, title, selectInfo } = this.state;
    // const calendarApi = selectInfo.view.calendar;
    console.log('Select Info: ', selectInfo);

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
        zIndex: 10
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
        <h2>{selectInfo.dateStr}</h2>
        <button type="button" onClick={this.closeModal}>
          close
        </button>
        <div>I am a modal</div>
        <Form handleSubmit={this.handleSubmit}>
          <Label>
            All day event
            <Input
              name="allDay"
              type="checkbox"
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
            <Label>
              Start Time
              <Input
                name="startTime"
                type="time"
                disabled={allDay}
                onChange={this.handleChange}
              />
            </Label>
            <Label>
              End Time
              <Input
                name="endTime"
                type="time"
                disabled={allDay}
                onChange={this.handleChange}
              />
            </Label>
          </Label>
          <button type="submit">submit</button>
        </Form>
      </Modal>
    );
  }

  render() {
    const { events, modalIsOpen } = this.state;

    return (
      <>
        <FullCalendar
          firstDay="1"
          businessHours={{
            daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
            startTime: '08:00', // a start time (10am in this example)
            endTime: '21:00'
          }}
          slotMinTime="06:00"
          slotMaxTime="23:00"
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
          dateClick={this.handleDateSelect}
          events={events}
          eventContent={this.renderEventContent} // custom render function
          eventClick={this.handleEventClick}
          eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
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
