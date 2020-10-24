import React, { Component } from 'react';
import Modal from 'react-modal';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
// eslint-disable-next-line import/no-cycle
import { Form, Input, Label } from '.';

Modal.setAppElement('#root');

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);
    // this.openModal = this.openModal.bind(this);
  }

  handleChange(event) {
    // const { room } = this.state;
    // room[event.target.name] = event.target.value;
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('handleSubmit Calendar', JSON.stringify(this.state, null, 2));
  }

  /* afterOpenModal() {
    // references are now synced and can be accessed.
    // subtitle.style.color = '#f00';
  } */

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleDateSelect(selectInfo) {
    const calendarApi = selectInfo.view.calendar;
    console.log(calendarApi.addEvent);
    calendarApi.unselect(); // clear date selection
    console.log('open MOdal');
    this.setState({ modalIsOpen: true });

    /*     if (title) {
          calendarApi.addEvent({
            id: Date.now(),
            title,
            start: selectInfo.dateStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay
          });
        } */
    console.log(calendarApi);
  }

  // eslint-disable-next-line class-methods-use-this
  handleEventClick(clickInfo) {
    if (
      // eslint-disable-next-line no-alert
      // eslint-disable-next-line no-restricted-globals
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  handleEvents(events) {
    console.log(events);
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

  render() {
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10
      },
      overlay: {
        zIndex: 10
      }
    };

    const { modalIsOpen, title } = this.state;
    return (
      <>
        <FullCalendar
          /*       locale="sv"
        weekends
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridWeek"
        // initialView="timeGridWeek"
        dateClick={handleDateClick} */
          id="calendar"
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
          dateClick={this.handleDateSelect}
          // dateClick={openModal}
          eventContent={this.renderEventContent} // custom render function
          eventClick={this.handleEventClick}
          eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
          /*
          // you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
        />

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2>Hello</h2>
          <button type="button" onClick={this.closeModal}>
            close
          </button>
          <div>I am a modal</div>
          <Form handleSubmit={this.handleSubmit}>
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
            <button type="submit">submit</button>
          </Form>
        </Modal>
      </>
    );
  }
}
