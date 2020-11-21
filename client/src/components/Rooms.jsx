import React from 'react';

import { roomService } from '../services';
import { RoomList } from './elements';

const moreInfo = async (id) => {
  console.log(id);
  roomService.getOne(id).then((roomInfo) => console.log(roomInfo));
};

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
        moreInfo={moreInfo}
        bookRoom={bookRoom}
      />
    );
  });
};

export default Rooms;
