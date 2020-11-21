import React from 'react';

// eslint-disable-next-line import/no-cycle
import { RoomList } from './elements';

const bookRoom = (id) => {
  console.log(id);
};

const Rooms = (props) => {
  const { rooms } = props;

  return rooms.map((room) => {
    return (
      <RoomList
        key={room._id}
        room={room}
        // moreInfo={moreInfo}
        bookRoom={bookRoom}
      />
    );
  });
};

export default Rooms;
