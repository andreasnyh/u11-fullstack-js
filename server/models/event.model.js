const mongoose = require('mongoose');

const EventSchema = mongoose.Schema(
  {
    groupId: {
      type: String,
      trim: true,
      minlength: 2,
    },
    allDay: {
      type: Boolean,
    },
    start: {
      type: Date,
    },
    end: {
      type: Date,
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    startRecur: {
      type: Date,
    },
    endRecur: {
      type: Date,
    },
    daysOfWeek: {
      type: Array,
    },
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
    classNames: {
      type: Array,
    },
    editable: {
      type: Boolean,
    },
    startEditable: {
      type: Boolean,
    },
    durationEditable: {
      type: Boolean,
    },
    overlap: {
      type: Boolean,
    },
    /*
    constraint: {
      ie. working hours
    },
     */
    color: {
      type: String,
    },
    backgroundColor: {
      type: String,
    },
    borderColor: {
      type: String,
    },
    textColor: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  // Options
  { timestamps: { createdAt: 'createdAt' } },
);

const Event = mongoose.model('Event', EventSchema, 'events');

module.exports = Event;
