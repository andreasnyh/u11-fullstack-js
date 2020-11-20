import React from 'react';

// import styled from 'styled-components';
import { roomService } from '../services';
import { Room } from './elements';

/* const StyledImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
`; */

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
      <Room
        key={room._id}
        room={room}
        moreInfo={moreInfo}
        bookRoom={bookRoom}
      />
    );
  });
};

export default Rooms;
